// main.js
import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

let count = 0;
const btn = document.querySelector('#likeBtn');

btn.addEventListener('click', () => {
    count++;
    btn.textContent = `いいね！ ${count}`;

    animate(btn, { scale: [1, 1.4, 1] }, { duration: 0.3 });
});
