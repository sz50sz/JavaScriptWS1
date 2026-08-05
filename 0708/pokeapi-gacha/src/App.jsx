// src/App.jsx
import { useState } from "react";
import PokemonCard from "./components/PokemonCard.jsx";

export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const drawGacha = async () => {
    setLoading(true);
    try {
      const id = Math.floor(Math.random() * 151) + 1; // 1〜151
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      console.error(err);
      alert("読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>PokeAPIガチャ</h1>
      <button onClick={drawGacha} disabled={loading}>
        {loading ? "読み込み中…" : "ガチャを引く"}
      </button>

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </main>
  );
}
