const imgArr = document.querySelectorAll(".loopUl li");
const imgArrLen = imgArr.length;
const conSlideDom = document.querySelector("#conSlide");
const loopw = conSlideDom.clientWidth; // 一次滚动的距离，也是最外面的大框框的宽度
imgArr.forEach(ele => {
  ele.style.width = loopw + "px";
});
const orgw = imgArr[0].clientWidth;
let w = 0;
let timer = null;
(function(obj) {
  const ulw = orgw * imgArrLen;
  document.querySelector(".loopUl").style.width = ulw + "px";
  timer = setInterval(loop, obj.time);
  // 鼠标移入停止轮播
  conSlideDom.addEventListener("mouseenter", () => {
    if (obj.mouseStop) {
      clearInterval(timer);
      timer = null;
    }
  });
  // 鼠标移出继续轮播
  conSlideDom.addEventListener("mouseleave", () => {
    timer = setInterval(loop, obj.time);
  });
  // 左滚动
  document.querySelector("#conSlide .prev").addEventListener("click", () => {
    if (w == 0) {
      if (obj.loop) {
        w = orgw * (imgArrLen - 1);
      } else {
        w = 0;
      }
    } else {
      w = w - orgw;
    }
    scroll_(w);
  });
  // 右滚动
  document.querySelector("#conSlide .next").addEventListener("click", () => {
    if (w >= orgw * (imgArrLen - 1)) {
      if (obj.loop) {
        w = 0;
      } else {
        w = orgw * (imgArrLen - 1);
      }
    } else {
      w = w + orgw;
    }
    scroll_(w);
  });
  document
    .querySelector("#conSlide .slidePage")
    .addEventListener("click", e => {
      const target = e.target;
      if (target.nodeName.toLocaleLowerCase() === "a") {
        const index = target.dataset.index * 1 - 1;
        w = index * orgw;
        scroll_(w);
      }
    });
})(slideParam);

function loop() {
  if (w < 0) {
    if (slideParam.loop) {
      w = orgw * (imgArrLen - 1);
    } else {
      w = 0;
    }
  } else if (w >= orgw * (imgArrLen - 1)) {
    if (slideParam.loop) {
      w = 0;
    } else {
      w = orgw * (imgArrLen - 1);
    }
  } else {
    w = w + loopw;
  }
  scroll_(w);
}

function scroll_(w) {
  imgArr.forEach(ele => {
    ele.style.transform = `translate(-${w}px, 0)`;
  });

  // 分页显示当前高亮
  const pageArr = document.querySelectorAll("#conSlide .slidePage a");
  pageArr.forEach((ele, index) => {
    if (index === w / orgw) {
      ele.classList.add("on");
    } else {
      ele.classList.remove("on");
    }
  });
}
