const toggleBtn = document.querySelector('.toggle-btn');
let linkMenu = document.querySelectorAll('.link-menu');

linkMenu.forEach(element => {
  toggleBtn.addEventListener('click', ()=>{
    if(element.classList.contains('open')) {
      element.classList.remove('open');
      element.classList.add('close');
    } else {
      element.classList.remove('close');
      element.classList.add('open');
    }
  })
})
