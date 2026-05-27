import './style.css';
import { inView, animate, stagger, scroll } from "motion";

inView('.fade-target h2', (element) => {
  // 画面内に入った時のアニメーション
  animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 0.6 });

  // 画面外に出た時のアニメーション（関数をreturnすると自動で発火します）
  return () => {
    animate(element, { opacity: 0, y: 40 }, { duration: 0.4 });
  };
});

inView('.cards', () => {
  animate('.card', { opacity: [0, 1], y: [40, 0] }, { duration: 0.5, delay: stagger(0.5) });
});

scroll(animate(".progress-bar", { scaleX: [0, 1] }));

// 追記：.hero のスクロール量に合わせて hero-title を上にフェードアウト
scroll(
  animate(".hero-title", { opacity: [1, 0], y: [0, -100] }),
  {
    target: document.querySelector(".hero"),
    offset: ["start 0.3", "start 0"], // heroの上端が画面の30%〜0%に来る間でアニメーション
  },
);

scroll(
  animate(".parallax-bg", { y: [0, -500] }),
  { target: document.querySelector(".parallax-section") },
);
