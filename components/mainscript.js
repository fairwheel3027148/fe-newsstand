import { displayDate } from "./utils/date.js";
import { subscribePress } from "./subscribe/subscribe.js";
import { originaltabs,mytabs } from "./newstab/newstab.js";
import { initmain } from "./displaynews/displayNews.js";
import { initTicker } from "./animation/rollingnews.js";
import stateManager from "./statemanager/stateManager.js";

const leftTicker = document.getElementById('leftNews');
const rightTicker = document.getElementById('rightNews');

window.addEventListener('load', () => {
  displayDate();
  initTicker(leftTicker, rightTicker);
});

export const clickArt = (buttonId) => {
  document.querySelectorAll('.subs').forEach(btn => btn.classList.remove('active-art'));
  document.getElementById(buttonId).classList.add('active-art');
}

document.addEventListener('DOMContentLoaded', () => {
  const allArticleButton = document.getElementById('all-article');
  const myArticleButton = document.getElementById('my-article');

  allArticleButton.addEventListener('click', () => {
      clickArt('all-article');
      originaltabs();
      initmain();
  });

  myArticleButton.addEventListener('click', () => {
      clickArt('my-article');
      mytabs();
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.news-list-container');
    // 이벤트 위임 -  부모 요소에 이벤트 리스너 설정
    container.addEventListener('click', (event) => {
      //news-press-subscribe에만 적용
      const subscribeButton = event.target.closest('.news-press-subscribe');
      if (subscribeButton) {
        subscribePress(stateManager.getClickedNews());
      }
  });
}); 