const items　=　document.querySelector(".js-carousel-items");

const itemNodes　=　document.querySelectorAll(".js-item");

const prev　=　document.querySelector(".js-prev");

const next　=　document.querySelector(".js-next");

const maxIndex　=　itemNodes.length;

let index = 0;

next.addEventListener("click",function(){if(index>=maxIndex-1)
  return;index+=1;
  items.style.transform="translateX(-"+index*490+"px)";});

prev.addEventListener("click",function(){if(index<0)
  return;index-=1;
  items.style.transform="translateX(-"+index*490+"px)";});
