// Small interactivity for SMRbuilders static site
document.addEventListener('DOMContentLoaded',function(){
  // mobile nav toggle
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if(btn && nav){
    btn.addEventListener('click',function(){
      nav.classList.toggle('open');
      if(nav.style.display === 'flex' || nav.classList.contains('open')){
        nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
      }
    });
  }

  // set year in footers
  var y = new Date().getFullYear();
  ['year','year-about','year-projects','year-contact'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.textContent = y;
  });
});
