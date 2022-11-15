import pangu from 'pangu';

document.addEventListener('DOMContentLoaded', () => {
  !!pangu && pangu.spacingElementByClassName('toc');
  !!pangu && pangu.spacingElementByClassName('post');
});

// window.oncontextmenu = function () {
//     event.preventDefault();
//     return false;
// }

window.onkeydown = window.onkeyup = window.onkeypress = (e) => {
  if (e.keyCode == 123) {
    e.preventDefault();
    window.e.returnValue = false;
  }
};
