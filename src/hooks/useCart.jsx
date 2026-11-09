import { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existingItem = items.find((item) => item.id === action.meal.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === action.meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { ...action.meal, quantity: 1 }];
    }
    case 'remove':
      return items
        .map((item) =>
          item.id === action.mealId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const cart = useMemo(() => ({
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    total: items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    ),
    addItem: (meal) => dispatch({ type: 'add', meal }),
    removeItem: (mealId) => dispatch({ type: 'remove', mealId }),
    clear: () => dispatch({ type: 'clear' }),
  }), [items]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider.');
  }
  return cart;
}
