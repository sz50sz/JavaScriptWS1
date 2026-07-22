import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// ここから一時的な投入コード（投入が終わったら削除する）
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

fetch("/items.json")
  .then((res) => res.json())
  .then(async (data) => {
    for (const { id, ...fields } of data.items) {
      await setDoc(doc(db, "items", id), fields);
    }
    console.log(`Firestoreに${data.items.length}件を投入しました`);
  });
// ここまで


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
