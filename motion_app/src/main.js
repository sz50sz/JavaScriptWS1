import { animate } from "motion";

const btn = document.querySelector("#copyBtn");
const icon = btn.querySelector(".copy-icon");
const label = btn.querySelector(".copy-label");
let isCopying = false;

// コピー後の状態に切り替える
function showCopied() {
  icon.textContent = "✅";
  label.textContent = "コピーしました";
  btn.classList.add("copied");
  animate(btn, { scale: [1, 1.08, 1] }, { duration: 0.25 });
}

// 元の状態に戻す
const resetButton = function () {
  icon.textContent = "📋";
  label.textContent = "コピー";
  btn.classList.remove("copied");
  isCopying = false;
};

btn.addEventListener("click", () => {
  if (isCopying) return;
  isCopying = true;

  showCopied();
  setTimeout(resetButton, 2000);
});

const rippleButton = document.querySelector("#rippleBtn");
const RIPPLE_SIZE = 80; // CSSのwidthと合わせる

// 左下・右下のうちクリック位置に近い方を返す
const getNearestCorner = (rect, x, y) => {
  const corners = [
    { x: 0, y: rect.height },
    { x: rect.width, y: rect.height },
  ];
  return corners.reduce((a, b) => {
    const da = (a.x - x) ** 2 + (a.y - y) ** 2;
    const db = (b.x - x) ** 2 + (b.y - y) ** 2;
    return da < db ? a : b;
  });
};

// 指定位置に波紋要素を生成して追加する
function createRipple(parent, x, y, size) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = `${x - size / 2}px`;
  ripple.style.top = `${y - size / 2}px`;
  parent.appendChild(ripple);
  return ripple;
}

// 波紋を広げて消すアニメーション
const playRipple = function (ripple) {
  return animate(
    ripple,
    { scale: [0, 5], opacity: [1, 0] },
    { duration: 0.8, ease: [0.2, 0, 0.4, 1] },
  ).then(() => ripple.remove());
};

rippleButton.addEventListener("click", (e) => {
  const rect = rippleButton.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;

  const nearest = getNearestCorner(rect, cx, cy);
  const ripple = createRipple(rippleButton, nearest.x, nearest.y, RIPPLE_SIZE);
  playRipple(ripple);
});

const tiltCard = document.querySelector("#tiltCard");

// カード内でのマウス位置を -0.5〜0.5 の範囲に正規化する
function getNormalizedPosition(rect, clientX, clientY) {
  const x = (clientX - rect.left) / rect.width - 0.5;
  const y = (clientY - rect.top) / rect.height - 0.5;
  return { x, y };
}

// カードを傾ける
const tilt = function (card, x, y) {
  animate(
    card,
    { rotateX: -y * 40, rotateY: x * 40, scale: 1.1 },
    { duration: 0.1, ease: "linear" },
  );
};

// カードを元に戻す
const resetTilt = (card) => {
  animate(
    card,
    { rotateX: 0, rotateY: 0, scale: 1 },
    { duration: 0.4, ease: "ease-out" },
  );
};

tiltCard.addEventListener("mousemove", (e) => {
  const rect = tiltCard.getBoundingClientRect();
  const { x, y } = getNormalizedPosition(rect, e.clientX, e.clientY);
  tilt(tiltCard, x, y);
});

tiltCard.addEventListener("mouseleave", () => {
  resetTilt(tiltCard);
});
