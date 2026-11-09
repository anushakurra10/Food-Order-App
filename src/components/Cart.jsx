import { useCart } from '../hooks/useCart.jsx';

function Cart({ onClose, onCheckout }) {
  const { items, total, addItem, removeItem } = useCart();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <p>
                  {item.name} - {item.quantity} × ${item.price}
                </p>
                <div className="cart-item-actions">
                  <button
                    type="button"
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => removeItem(item.id)}
                  >
                    −
                  </button>
                  <p className="cart-item-quantity">{item.quantity}</p>
                  <button
                    type="button"
                    aria-label={`Add one ${item.name}`}
                    onClick={() => addItem(item)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${total.toFixed(2)}</p>
        </>
      )}
      <div className="modal-actions">
        {items.length > 0 && (
          <button className="button" type="button" onClick={onCheckout}>
            Go to checkout
          </button>
        )}
        <button className="text-button" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Cart;
