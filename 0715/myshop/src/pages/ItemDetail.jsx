import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import Heart from "../assets/heart.svg?react";

export default function ItemDetail({ favorites, cart }) {
  // URLパラメータを取得
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "items")).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const found = data.find((i) => i.id === id);
      setItem(found ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="loading">読み込み中...</p>;
  }

  // アイテムが見つからなかった場合
  if (!item) {
    return (
      <div className="item-detail item-detail--notfound">
        <p>アイテムが見つかりません。</p>
        <Link to="/" className="item-detail__back">
          ← 一覧へ戻る
        </Link>
      </div>
    );
  }

  const handleFavorite = () => {
    if (favorites.has(item.id)) {
      favorites.remove(item.id);
    } else {
      favorites.add(item.id);
    }
  };

  const handleAddToCart = () => {
    cart.add(item.id);
  };

  return (
    <div className="item-detail">
      <Link to="/" className="item-detail__back">
        ← 一覧へ戻る
      </Link>
      <div className="item-detail__image">
        <img src={item.image} alt={item.name} />
        {item.status === 'soldout' && <span className="item-detail__badge">soldout</span>}
      </div>
      <div className="item-detail__body">
        <p className="item-detail__category">{item.category}</p>
        <h2 className="item-detail__name">{item.name}</h2>
        <p className="item-detail__price">¥{item.price.toLocaleString()}</p>
        <p className="item-detail__description">{item.description}</p>
        <dl className="item-detail__specs">
          <div className="item-detail__spec">
            <dt>品番</dt>
            <dd>{item.code}</dd>
          </div>
          <div className="item-detail__spec">
            <dt>カラー</dt>
            <dd>{item.color}</dd>
          </div>
          <div className="item-detail__spec">
            <dt>サイズ</dt>
            <dd>{item.size}</dd>
          </div>
        </dl>

        <div className="item-detail__actions">
          <button
            type="button"
            className={
              favorites.has(item.id)
                ? "item-detail__fav is-active"
                : "item-detail__fav"
            }
            onClick={handleFavorite}
          >
            <Heart className="heart-icon" />
          </button>

          {item.status !== 'soldout' && (
            <button
              type="button"
              className="item-detail__cart"
              onClick={handleAddToCart}
            >
              カートに入れる
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
