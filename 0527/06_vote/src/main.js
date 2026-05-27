import './style.css';
import { inView, animate, stagger, scroll } from "motion";
import { vote, getRates } from './candidates.js';

const animateBars = () => {
    getRates().forEach(({ id, rate }) => {
        const bar = document.querySelector(`[data-id="${id}"] .bar`);

        animate(
            bar,
            { width: `${rate}%` },
            { duration: 0.4, easing: 'ease-out' }
        );
    });
};

document.querySelectorAll('.card').forEach((card) => {
    const id = Number(card.dataset.id);
    const btn = card.querySelector('.vote-btn');
    const image = card.querySelector('.candidate-image img');
    const hundred = card.querySelector('.hundred-effect');

    btn.addEventListener('click', () => {

        // 現在の票数を取得
        const currentVotes = vote(id);

        animate(
            btn,
            { scale: [1, 1.3, 1] },
            { duration: 0.3 }
        );

        animate(
            image,
            {
                rotate: [0, -8, 8, -4, 0],
                scale: [1, 1.05, 1]
            },
            {
                duration: 0.6,
                easing: 'ease-in-out'
            }
        );

        animateBars();

        // 100の倍数なら演出
        if (currentVotes % 100 === 0) {

            // 表示する数字を変更
            hundred.textContent = currentVotes;

            animate(
                hundred,
                {
                    opacity: [0, 1, 1, 0],
                    scale: [0, 2.5, 2.2, 2.2],
                },
                {
                    duration: 1.2,
                    easing: 'ease-out'
                }
            );
        }
    });
});



inView('.fade-target h2', (element) => {
    animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 0.6 });

    return () => {
        animate(element, { opacity: 0, y: 40 }, { duration: 0.4 });
    };
});


scroll(animate(".page-progress-bar", { scaleX: [0, 1] }));

inView('#voteList', () => {
    animate(
        '.card',
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.5, delay: stagger(0.3) }
    );
});


document.addEventListener('DOMContentLoaded', () => {

    // タイトルの文字を一文字ずつ表示する
    animate(
        ".hero-title",
        {
            opacity: [0, 1], // 透明から表示
            y: [-50, 0]        // 下から上へ移動
        },
        {
            duration: 0.8,    // 全体のアニメーション時間
            delay: stagger(0.5) // 0.1秒ずつずらして開始（ここがポイント！）
        }
    );

});