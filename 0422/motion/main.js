

import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

const box = document.querySelector('#box');
const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    animate(box, { scale: [1, 1.4, 1] }, { duration: 0.4 });
});
