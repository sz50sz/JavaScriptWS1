// src/hooks/useCart.js
import { useState, useEffect } from "react";

const KEY = "myitems:cart";

export function useCart() {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem(KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(entries));
    }, [entries]);

    // 追加：すでにカートにあれば数量+1、なければ数量1で新規追加
    const add = (id) => {
        const found = entries.find((entry) => entry.id === id);
        if (found) {
            setEntries(
                entries.map((entry) =>
                    entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry
                )
            );
        } else {
            setEntries([...entries, { id, quantity: 1 }]);
        }
    };

    // 数量変更：0以下になったらカートから削除
    const update = (id, quantity) => {
        if (quantity <= 0) {
            remove(id);
        } else {
            setEntries(
                entries.map((entry) =>
                    entry.id === id ? { ...entry, quantity } : entry
                )
            );
        }
    };

    // 削除
    const remove = (id) => setEntries(entries.filter((entry) => entry.id !== id));

    // カート内の合計個数（ヘッダーのバッジに使う）
    const total = entries.reduce((sum, entry) => sum + entry.quantity, 0);

    return { entries, add, update, remove, total };
}
