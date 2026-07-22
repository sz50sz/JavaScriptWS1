// src/hooks/useFavorites.js
import { useState, useEffect } from "react";

const KEY = "myitems:favorites";

export function useFavorites() {
    // LocalStorageから初期値を読む（保存がなければ空配列で始める）
    const [ids, setIds] = useState(() => {
        const saved = localStorage.getItem(KEY);
        return saved ? JSON.parse(saved) : [];
    });

    // idsが変わるたびにLocalStorageへ保存する
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(ids));
    }, [ids]);

    const add = (id) => setIds([...ids, id]);
    const remove = (id) => setIds(ids.filter((favId) => favId !== id));
    const has = (id) => ids.includes(id);

    return { ids, add, remove, has };
}
