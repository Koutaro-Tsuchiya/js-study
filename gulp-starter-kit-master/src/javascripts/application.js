const toggleBtn = document.querySelector('.toggle-btn');
const linkMenu = document.querySelector('.link-menu');
const linkItem = document.querySelectorAll(".link-item")

  toggleBtn.addEventListener('click', ()=>{
    if(linkMenu.dataset.opened=="0") {
      linkMenu.setAttribute("data-opened", "1");
    } else {
      linkMenu.setAttribute("data-opened", "0");
    }
  })

  linkItem.forEach(element => {
  element.addEventListener('click', ()=>{
    linkMenu.setAttribute("data-opened", "0");
  })
})
