import logo from '../assets/logo.jpg';
import { useCart } from '../hooks/useCart.jsx';

function Header({ onCartClick }) {
  const { count } = useCart();

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="FoodOrder logo" />
        <h1>Order Food</h1>
      </div>
      <button className="text-button cart-count" type="button" onClick={onCartClick}>
        Cart ({count})
      </button>
    </header>
  );
}

export default Header;
