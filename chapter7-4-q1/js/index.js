const count　=　document.querySelector(".console");

const down　=　document.querySelector(".down");

const up　=　document.querySelector(".up");

let index = 0;

up.addEventListener("click",function() {
  if(index < 100){
  index += 1;
  count.innerHTML = index;
  }
})

down.addEventListener("click",function() {
  if(index > 0){
  index -= 1;
  count.innerHTML = index;
  }
})
