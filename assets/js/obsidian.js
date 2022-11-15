(function () {
  let pList = null;

  window.addEventListener(
    'DOMContentLoaded',
    () => {
      pList = document.querySelectorAll('p');
      const regex4 = /(?<=\[\[).*?(?=\]\])/g;

      pList.forEach((p) => {
        const innner = p.innerHTML.match(regex4);
        if (innner) {
          const links = innner[0].split('#');
          const href = links.length > 1
            ? `/post/${links[0].trim().replace(/\s/g, '-')}/#${links[1]?.trim().replace(/\s/g, '-')}`
            : `/post/${links[0].trim().replace(/\s/g, '-')}`;
          p.innerHTML = `<a href='${href}'>${innner[0]}</a>`;
        }
      });
    },
    { once: true },
  );
}());
