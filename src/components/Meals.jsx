import { getApiUrl } from '../config/env.js';
import { useHttp } from '../hooks/useHttp.js';
import { useCart } from '../hooks/useCart.jsx';

function Meals() {
  const { data, isLoading, error } = useHttp('/meals');
  const { addItem } = useCart();

  if (isLoading) {
    return <p className="center">Loading meals...</p>;
  }

  if (error || !Array.isArray(data)) {
    return (
      <div className="error">
        <h2>Could not load meals</h2>
        <p>{error || 'The meals service returned invalid data.'}</p>
      </div>
    );
  }

  return (
    <ul id="meals">
      {data.map((meal) => (
        <li className="meal-item" key={meal.id}>
          <article>
            <img src={getApiUrl(meal.image)} alt={meal.name} />
            <div>
              <h3>{meal.name}</h3>
              <p className="meal-item-price">${meal.price}</p>
              <p className="meal-item-description">{meal.description}</p>
              <div className="meal-item-actions">
                <button
                  className="button"
                  type="button"
                  onClick={() => addItem(meal)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default Meals;
