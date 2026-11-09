import { useState } from 'react';
import CartDialog from './components/CartDialog.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartProvider } from './hooks/useCart.jsx';

function App() {
  // A single dialog switches between cart and checkout content.
  const [activeModal, setActiveModal] = useState(null);

  return (
    <CartProvider>
      <Header onCartClick={() => setActiveModal('cart')} />
      <Meals />
      <CartDialog
        view={activeModal}
        onClose={() => setActiveModal(null)}
        onCheckout={() => setActiveModal('checkout')}
      />
    </CartProvider>
  );
}

export default App;
