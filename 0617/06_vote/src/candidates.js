// ⬇ ファイル冒頭に追加：永続化用のキー
const STORAGE_KEY = "vote-2026";

// ⬇ 既存の candidates 配列を「初期値」として名前変更
const initialCandidates = [
    { id: 1, votes: 0 },
    { id: 2, votes: 0 },
    { id: 3, votes: 0 },
];

// ⬇ 追加：起動時にLocalStorageから読み込む（無ければ初期値）
const loadCandidates = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCandidates;
};

// ⬇ 追加：投票後に保存する
const saveCandidates = (candidates) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

// ⬇ 書き換え：const → let（map()で作り直すため）+ 初期値を loadCandidates から
let candidates = loadCandidates();

// updateVoteText() / getRates()

// ⬇ 既存の vote を「イミュータブル更新 + 保存」に書き換え
export const vote = (id) => {
    candidates = candidates.map((c) =>
        c.id === id ? { ...c, votes: c.votes + 1 } : c
    );
    saveCandidates(candidates);
    updateVoteText();
};

// ⬇ 末尾に追加：リセット用にexport
export const resetCandidates = () => {
    localStorage.removeItem(STORAGE_KEY);
    candidates = initialCandidates.map((c) => ({ ...c }));
    updateVoteText();
};

// ⬇ 末尾に追加：起動時に、読み込んだ票数を画面へ反映する
updateVoteText();
