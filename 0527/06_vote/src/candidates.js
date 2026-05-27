// candidates.js
// 自分のテーマに合わせて書き直してください。
const candidates = [
    { id: 1, votes: 0 },
    { id: 2, votes: 0 },
    { id: 3, votes: 0 },
];

// 票数テキストを更新する関数
const updateVoteText = () => {
    candidates.forEach((item) => {
        const card = document.querySelector(`[data-id="${item.id}"]`);
        card.querySelector('.votes').textContent = `${item.votes}票`;
    });
};

// 各候補の得票率を返す関数
export const getRates = () => {
    const total = candidates.reduce((sum, item) => sum + item.votes, 0);
    return candidates.map((item) => ({
        id: item.id,
        rate: total > 0 ? Math.round((item.votes / total) * 100) : 0,
    }));
};

// 投票処理の関数
export const vote = (id) => {
    const target = candidates.find((item) => item.id === id);

    if (!target) return 0;

    target.votes++;
    updateVoteText();

    return target.votes;
};