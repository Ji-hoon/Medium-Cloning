
// 페이지 로딩 완료 시 처리할 명령어
document.addEventListener("DOMContentLoaded", function(event) { 
    // 더미 아티클 생성은 페이지 로딩 완료 시 1회만 수행
    let dummyArticleElement = document.getElementsByTagName('article');
    let targetElement = document.getElementsByClassName('article-container')[0];

    //기본 아이템 5개 기준으로 15개 아이템 추가
    for(let i=0;i<20;i++){
        const clonedElement = dummyArticleElement[i].cloneNode(true);
        targetElement.append(clonedElement);
    }

    getElementsSizes(); // 계산에 필요한 값을 구하는 함수 1회 실행
});

const stickyAside = document.getElementsByClassName('aside-container')[0]; //타겟 엘리먼트를 담을 변수

let windowHeight; //브라우저의 높이를 담을 변수
let stickyAsideHeight; //타겟 엘리먼트의 높이를 담을 변수 (외곽)
let headerHeight; //헤더 엘리먼트의 높이를 담을 변수
let bannerHeight; //상단 배너 엘리먼트의 높이를 담을 변수


// getElementsSizes 함수 : sticky 판단에 필요한 값을 업데이트
function getElementsSizes() {
    windowHeight = window.innerHeight;
    stickyAsideHeight = stickyAside.offsetHeight;
    headerHeight = document.getElementsByTagName('nav')[0].offsetHeight;
    bannerHeight = document.getElementsByClassName('banner-area')[0].offsetHeight;
}

// stickAside 함수 : 현재 스크롤값과 윈도우 높이를 기준으로 sticky 여부를 판단하여 적용
function stickAside(scrollPos) {
  const aside = document.getElementsByTagName('aside')[0];
  if(scrollPos){
    aside.className = 'sticky';
    stickyAside.style.top = -(stickyAsideHeight - windowHeight).toString() + "px";
  } else {
    aside.className = '';
  }
}

// window 사이즈 변경 이벤트 발생 시 마다 실행되는 함수
window.addEventListener("resize", (event) => {
    getElementsSizes();
});

// scroll 이벤트 발생 시 마다 실행되는 함수
document.addEventListener("scroll", (event) => {
  //lastKnownScrollPosition = document.getElementById('root').scrollY;
  let lastKnownScrollPosition = 0; //스크롤 이벤트 발생 시 scrollY 값을 담을 변수
  let stickyBreakPoint = 0; //sticky 상태를 붙일 지 판단하는 기준 값을 담을 변수 (viewport의 높이에 따라 변동)

  lastKnownScrollPosition = window.scrollY;
  stickyBreakPoint = stickyAsideHeight - windowHeight + headerHeight + bannerHeight; 
  // e.g. 955 viewport의 높이 430일 때의 값 : aside-container의 높이가 “1280”이라 치면 (container 내부 상단 마진 32px 포함) scrollTop 값이 “850” (container 높이 - 뷰포트 높이) 이상일 때 이격
    
  if(lastKnownScrollPosition >= stickyBreakPoint){
    stickAside(true);
  } else {
    stickAside(false);
  }

});




