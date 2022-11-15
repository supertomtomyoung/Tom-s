import { throttle } from 'function';

(function () {
  function scrollTo(targetHeight) {
    if (!!singlePost && !!header && !!content && !!footer) {
      const totalHeight =				content.offsetHeight
				+ footer.offsetHeight
				+ header.offsetHeight
				+ 160
				- document.body.clientHeight;
      if (targetHeight > totalHeight) {
        targetHeight = totalHeight;
      }
      if (singlePost.scrollTop != targetHeight) {
        singlePost.scrollTop = targetHeight;
      }
    }
  }

  function backToTop() {
    !!singlePost && scrollTo(0);
  }

  function setReadPercentage() {
    if (!!singlePost && !!header && !!content && !!footer && !!percentage) {
      const currentHeight = singlePost.scrollTop;
      const totalHeight =				content.offsetHeight
				+ footer.offsetHeight
				+ header.offsetHeight
				+ 160
				- document.body.clientHeight;
      const readPercentage = Math.round((currentHeight / totalHeight) * 100);
      percentage.style.width = `${readPercentage}%`;
    }
  }

  function showMenu(currentHeight) {
    if (menu) {
      currentHeight > 10
        ? menu.classList.add('show')
        : menu.classList.remove('show');
    }
  }

  function checkCurrentHeader(currentHeight) {
    if (
      !!currentHeight
			&& !!headerList
			&& !!tocList
			&& headerList.length > 0
			&& tocList.length > 0
			&& headerList?.length == tocList?.length
    ) {
      let activeIndex = null;
      for (let index = 0; index <= headerList.length; index++) {
        if (!!headerList[index] && !!headerList[index + 1]) {
          if (
            !!headerList[index]?.offsetTop
						&& currentHeight > headerList[index].offsetTop
						&& !!headerList[index + 1]?.offsetTop
						&& currentHeight < headerList[index + 1].offsetTop
          ) {
            activeIndex = index;
            break;
          }
        }
        if (!!headerList[index] && !headerList[index + 1]) {
          if (
            !!headerList[index]?.offsetTop
						&& currentHeight > headerList[index].offsetTop
          ) {
            activeIndex = index;
            break;
          }
        }
      }
      clearActivedTocItem();
      setActiveTocItem(activeIndex);
    }
  }

  function clearActivedTocItem() {
    const activeTocList = document.querySelectorAll('.toc li .active');
    !!activeTocList
			&& activeTocList.forEach((ele) => ele.classList.remove('active'));
  }

  function setActiveTocItem(index) {
    !!tocList[index] && tocList[index].classList.add('active');
    tocContainerScroll();
  }

  function tocContainerScroll() {
    const activeLi = document.querySelector('.toc li .active')?.parentNode;
    if (tocContainer) {
      if (activeLi) {
        if (
          activeLi.offsetTop + activeLi.clientHeight
					> tocContainer.clientHeight + tocContainer.scrollTop
        ) {
          tocContainer.scrollTop
						+= activeLi.offsetTop
						+ activeLi.clientHeight
						- (tocContainer.clientHeight + tocContainer.scrollTop)
						+ 10;
        }
        if (activeLi.offsetTop < tocContainer.scrollTop) {
          tocContainer.scrollTop = activeLi.offsetTop - 10;
        }
      } else {
        tocContainer.scrollTop = 0;
      }
    }
  }

  function handleImgError(e) {
    e.target.src = '/img_error.svg';
  }

  let singlePost = null;
  let header = null;
  let content = null;
  let footer = null;
  let headerList = null;
  let tocContainer = null;
  let tocList = null;
  let imgList = null;
  let menu = null;
  let backTopBtn = null;
  let percentage = null;

  window.addEventListener(
    'DOMContentLoaded',
    (e) => {
      singlePost = document.querySelector('.single-post');
      header = document.querySelector('.single-post .post .header');
      content = document.querySelector('.single-post .post .content');
      footer = document.querySelector('.single-post .post .footer');
      headerList = document.querySelectorAll(
        '.content h1[id],h2[id],h3[id],h4[id],h5[id]',
      );
      tocContainer = document.querySelector('.toc');
      tocList = document.querySelectorAll('.toc li .toc-link');
      imgList = document.querySelectorAll('.content img');
      menu = document.querySelector('.menu');
      backTopBtn = document.querySelector('#back_top_btn');
      percentage = document.querySelector('#percentage');

      if (!!imgList && imgList.length > 0) {
        imgList.forEach((ele) => {
          ele.onerror = handleImgError;
        });
      }

      if (singlePost) {
        checkCurrentHeader(singlePost.scrollTop + document.body.clientHeight);
        singlePost.addEventListener(
          'scroll',
          throttle(() => {
            checkCurrentHeader(
              singlePost.scrollTop + document.body.clientHeight,
            );
            showMenu(singlePost.scrollTop);
            setReadPercentage();
          }, 200),
        );
      }

      if (
        !!tocList
				&& tocList.length > 0
				&& !!headerList
				&& headerList.length > 0
      ) {
        tocList.forEach((ele, index) => {
          ele.addEventListener('click', (e) => {
            if (headerList[index]) {
              scrollTo(headerList[index].offsetTop);
            }
          });
        });
      }

      !!backTopBtn && backTopBtn.addEventListener('click', backToTop);
      !!percentage && setReadPercentage();
    },
    { once: true },
  );

  window.addEventListener(
    'resize',
    throttle(() => {
      if (singlePost) {
        checkCurrentHeader(singlePost.scrollTop + document.body.clientHeight);
        setReadPercentage();
      }
    }, 200),
  );
}());

// function showActiveTocItem2() {
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             const id = entry.target.id;
//             if (entry.intersectionRatio > 0) {
//                 let activeTocEle = document.querySelectorAll('.toc li .active');
//                 !!activeTocEle && activeTocEle.forEach(ele => { ele.classList.remove('active') });

//                 let tocEle = document.querySelector(`.toc li a[data-anchorId="${id}"]`);
//                 !!tocEle && tocEle.classList.add('active');
//             } else {
//                 if (document.querySelectorAll('.toc li .active').length == 1) {
//                     return;
//                 } else {
//                     let tocEle = document.querySelector(`.toc li a[data-anchorId="${id}"]`);
//                     !!tocEle && tocEle.classList.remove('active');
//                 }
//             }
//         })
//     });

//     // 监听h1-5标签是否进入可视区域
//     !!headerList && headerList.forEach(section => {
//         observer.observe(section);
//     });
// }

// function scrollTo2(height, time) {
//     if (!time) {
//         singlePost.scrollTop = height;
//     } else {
//         // 设置循环的间隔时间  值越小消耗性能越高
//         const spacingTime = 40;
//         // 计算循环的次数
//         let spacingIndex = time / spacingTime;
//         // 获取当前滚动条位置
//         let currentHeight = singlePost.scrollTop;
//         // 计算每次滑动的距离，可以是正数也可以是负数
//         let everyStep = (height - currentHeight) / spacingIndex;

//         let scrollTimer = setInterval(() => {
//             if (spacingIndex > 0) {
//                 spacingIndex--;
//                 currentHeight += everyStep;
//                 singlePost.scrollTop = currentHeight;
//             } else {
//                 clearInterval(scrollTimer);
//             }
//         }, spacingTime);
//     }
// }
