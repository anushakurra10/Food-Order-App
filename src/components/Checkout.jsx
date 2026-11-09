import { useActionState, useState } from 'react';
import { useHttp } from '../hooks/useHttp.js';
import { useCart } from '../hooks/useCart.jsx';
import { validateOrderCustomer } from '../services/orderValidation.js';
import Input from './UI/Input.jsx';

function Checkout({ onClose }) {
  const { items, total: totalAmount, clear } = useCart();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    street: '',
    'postal-code': '',
    city: '',
  });
  const { sendRequest } = useHttp('/orders', 'POST', undefined, null, false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCustomer((currentCustomer) => ({ ...currentCustomer, [name]: value }));
  }

  async function submitOrder(_previousState, formData) {
    const { customer: validatedCustomer, error } = validateOrderCustomer(formData);
    if (error) {
      return { error, isSubmitted: false };
    }

    // Match the backend contract and send the order as a single payload.
    const order = {
      totalAmount: Number(totalAmount.toFixed(2)),
      items: items.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      })),
      customer: {
        name: validatedCustomer.name,
        email: validatedCustomer.email,
        street: validatedCustomer.street,
        'postal-code': validatedCustomer['postal-code'],
        city: validatedCustomer.city,
      },
    };

    const result = await sendRequest({ order });
    if (result.error) {
      return {
        error: result.error,
        isSubmitted: false,
      };
    }

    // Clear the shared cart while keeping this dialog open for confirmation.
    clear();
    return { error: null, isSubmitted: true };
  }

  const [formState, formAction, isPending] = useActionState(submitOrder, {
    error: null,
    isSubmitted: false,
  });

  if (formState.isSubmitted) {
    return (
      <div className="cart">
        <h2>Order submitted</h2>
        <p>Thank you! Your order has been received.</p>
        <div className="modal-actions">
          <button className="button" type="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Checkout</h2>
      <p>Total amount: ${totalAmount.toFixed(2)}</p>
      <form className="checkout-form" action={formAction} noValidate>
        <Input
          id="checkout-name"
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          value={customer.name}
          onChange={handleInputChange}
          required
        />
        <Input
          id="checkout-email"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={customer.email}
          onChange={handleInputChange}
          required
        />
        <Input
          id="checkout-street"
          label="Street"
          name="street"
          type="text"
          autoComplete="street-address"
          value={customer.street}
          onChange={handleInputChange}
          required
        />
        <div className="control-row">
          <Input
            id="checkout-postal-code"
            label="Pincode"
            name="postal-code"
            type="text"
            autoComplete="postal-code"
            value={customer['postal-code']}
            onChange={handleInputChange}
            required
          />
          <Input
            id="checkout-city"
            label="City"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={customer.city}
            onChange={handleInputChange}
            required
          />
        </div>
        {formState.error && <p className="error" role="alert">{formState.error}</p>}
        <div className="modal-actions">
          <button className="text-button" type="button" onClick={onClose}>
            Close
          </button>
          <button className="button" type="submit" disabled={isPending || items.length === 0}>
            {isPending ? 'Submitting...' : 'Submit order'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
