// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export default function Cart({ cart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "items")).then((snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  // カートのエントリ（id・数量）に、items.jsonの商品情報を合体させる
  const rows = cart.entries
    .map((entry) => {
      const item = items.find((i) => i.id === entry.id);
      return item ? { ...item, quantity: entry.quantity } : null;
    })
    .filter((row) => row !== null);

  // 合計金額（単価 × 数量 の合計）
  const totalPrice = rows.reduce((sum, row) => sum + row.price * row.quantity, 0);

  if (cart.entries.length === 0) {
    return (
      <div className="page-placeholder">
        <h2>cart</h2>
        <p>
          カートは空です。<Link to="/">一覧へ戻る</Link>
        </p>
      </div>
    );
  }

  return (
    <section className="cart">
      <h2>カート</h2>
      <ul className="cart-list">
        {rows.map((row) => (
          <li key={row.id} className="cart-row">
            <img src={row.image} alt={row.name} />
            <div className="cart-row__info">
              <p>{row.name}</p>
              <p>¥{row.price.toLocaleString()}</p>
            </div>
            <div className="cart-row__quantity">
              <button type="button" onClick={() => cart.update(row.id, row.quantity - 1)}>−</button>
              <span>{row.quantity}</span>
              <button type="button" onClick={() => cart.update(row.id, row.quantity + 1)}>＋</button>
            </div>
            <p className="cart-row__subtotal">¥{(row.price * row.quantity).toLocaleString()}</p>
            <button type="button" onClick={() => cart.remove(row.id)}>削除</button>
          </li>
        ))}
      </ul>
      <p className="cart-total">合計：¥{totalPrice.toLocaleString()}</p>
    </section>
  );
}
