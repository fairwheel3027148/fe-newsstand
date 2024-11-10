import { showCancelModal, showSubModal } from "./subalarm.js";
import subscribeManager from "../statemanager/subscribeManager.js";
import { mytabs } from "../newstab/newstab.js";

//구독버튼 누르면 -> 구독하기
export const subscribePress = (btntxt) => {
    let existingPressData = localStorage.getItem('mysubscribe');
    subscribeManager.setSubscribedData(JSON.parse(existingPressData));
    let subscribedNews = subscribeManager.getSubscribedData();

    if (!subscribedNews.includes(btntxt)){
        //데이터 추가
        subscribedNews.push(btntxt);
        subscribeManager.addNews(btntxt);
        localStorage.setItem('mysubscribe', JSON.stringify(subscribedNews));

        // 버튼 이미지 변경
        const button = document.querySelector(`.news-press-subscribe`);
        button.innerHTML = '<img src="../../icons/cancel.svg" alt="Subscribed">'; // 버튼 이미지 변경
        showSubModal();
        mytabs();
    }
    else{
        cancelsubscribe(btntxt);
    }
        
}

export const showsubscribe = (btntext) => {
  let existingPressData = localStorage.getItem('mysubscribe');
  subscribeManager.setSubscribedData(JSON.parse(existingPressData));
  let subscribedNews = subscribeManager.getSubscribedData();

  const subscribeButton = document.querySelector(`.news-press-subscribe`);

  if (subscribedNews.includes(btntext)) {
      subscribeButton.innerHTML = '<img src="../../icons/cancel.svg" alt="Cancel">';
  }
  else{
    subscribeButton.innerHTML = '<img src="../../icons/Subscribe.svg" alt="Subscribe">';
  
  }
  subscribeButton.style.cursor = 'pointer';

}

//구독취소
export const cancelsubscribe = (btntext) => {
  let existingPressData = localStorage.getItem('mysubscribe');
  subscribeManager.setSubscribedData(JSON.parse(existingPressData));
  let subscribedNews = subscribeManager.getSubscribedData();

  if (subscribedNews.includes(btntext)) {
    showCancelModal(btntext);
  }
}