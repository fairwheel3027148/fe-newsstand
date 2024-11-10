import { mytabs } from "../newstab/newstab.js";
import subscribeManager from "../statemanager/subscribeManager.js";
import { subProgressTimer } from "../displaynews/displaySubscribe.js";

export const showSubModal = () => {
    const modal = document.getElementById('submodal');
    modal.innerText = "내가 구독한 언론사에 추가되었습니다.";
    modal.className = 'active';
    setTimeout(() => {
        modal.classList.remove('active');
    }, 5000);
}

const closeModal = () => {
    const modalContainer = document.querySelector('.cancel-modal-container');
    modalContainer.classList.remove('show');
    modalContainer.innerHTML = ''; 
};

// 구독 취소 모달
export const showCancelModal = (subscribedNews) => {

    let modalContainer = document.querySelector('.cancel-modal-container');

    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.classList.add('cancel-modal-container');
        document.body.appendChild(modalContainer);  //body에 추가
    }
    
    modalContainer.classList.add('show');
    
    const modalContent = `
        <div class="cancel-modal-content">
            <p><span id="cancel-modal-text">${subscribedNews}</span>을(를) 구독해지하시겠습니까?</p>
        </div>
        <div class="cancel-modal-btn">
            <div class="cancel-yes">예, 해지합니다.</div>
            <div class="cancel-no">아니오</div>
        </div>
    `;
    
    modalContainer.innerHTML = modalContent;
    
    const cancelyes = modalContainer.querySelector('.cancel-yes');
    const cancelno = modalContainer.querySelector('.cancel-no');

    cancelyes.addEventListener('click', () => {
        closeModal();

        const subscribeButton = document.querySelector('.news-press-subscribe');
        subscribeButton.innerHTML = '<img src="../../icons/Subscribe.svg" alt="Subscribe">';

        subscribeManager.removeNews(subscribedNews);

        // 로컬 스토리지에 업데이트된 데이터 저장
        localStorage.setItem('mysubscribe', JSON.stringify(subscribeManager.getSubscribedData()));
    
        clearInterval(subProgressTimer);
        mytabs();
    });

    cancelno.addEventListener('click', () => {
        closeModal();
    });
};
