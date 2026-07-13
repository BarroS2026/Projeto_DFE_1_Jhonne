
const menuToggle = document.getElementById('menuToggle');
const menuLinks = document.getElementById('menuLinks');

if (menuToggle && menuLinks) {

  menuToggle.setAttribute('aria-label', 'Abrir menu');
  menuToggle.setAttribute('aria-expanded', 'false');

 
  menuToggle.textContent = "☰";

  
  menuToggle.addEventListener('click', function () {

    const menuAberto = menuLinks.classList.toggle('menu-visivel');

    menuToggle.setAttribute('aria-expanded', String(menuAberto));
    menuToggle.setAttribute(
      'aria-label',
      menuAberto ? 'Fechar menu' : 'Abrir menu'
    );

    
    menuToggle.textContent = menuAberto ? "✖" : "☰";
  });

  
  menuLinks.querySelectorAll('a').forEach(function (link) {

    link.addEventListener('click', function () {

      
      if (link.getAttribute('href') === 'index.html') {
        localStorage.removeItem('usuario_logado');
      }

      menuLinks.classList.remove('menu-visivel');

      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');

      
      menuToggle.textContent = "☰";
    });

  });

  
  const paginaAtual = window.location.pathname.split("/").pop();

  menuLinks.querySelectorAll("a").forEach(function (link) {

    if (link.getAttribute("href") === paginaAtual) {
      link.classList.add("ativo");
    }

  });

}