// src/components/ItemCard.jsx
import { Link } from "react-router-dom";
import Heart from "../assets/heart.svg?react";

export default function ItemCard({ item, favorites, cart }) {
  const handleFavorite = (e) => {
    e.preventDefault();

    if (favorites.has(item.id)) {
      favorites.remove(item.id);
    } else {
      favorites.add(item.id);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    cart.add(item.id);
  };

  return (
    <Link to={`/items/${item.id}`} className="item-card">
      <div className="item-card__image">
        <img src={item.image} alt={item.name} />
      </div>

      <h3>{item.name}</h3>
      <p>¥{item.price.toLocaleString()}</p>

      <button
        type="button"
        className={
          favorites.has(item.id)
            ? "item-card__fav is-active"
            : "item-card__fav"
        }
        onClick={handleFavorite}
      >
        <Heart className="heart-icon" />
      </button>

      {item.status !== "soldout" && (
        <button
          type="button"
          className="item-card__cart"
          onClick={handleAddToCart}
        >
          カートに入れる
        </button>
      )}
    </Link>
  );
}