import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';
import Modal from './UI/Modal.jsx';

function CartDialog({ view, onClose, onCheckout }) {
  if (!view) {
    return null;
  }

  // Reuse the same dialog element while swapping its cart or checkout content.
  return (
    <Modal open onClose={onClose}>
      {view === 'checkout' ? (
        <Checkout onClose={onClose} />
      ) : (
        <Cart onClose={onClose} onCheckout={onCheckout} />
      )}
    </Modal>
  );
}

export default CartDialog;
