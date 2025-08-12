// catalogo.js
import { catalogo, getEstante, setEstante, getTema, setTema, LS_KEY } from './dados.js';

// estado em memória
let estante = getEstante(); // [{ id, lido: boolean }]

//Renderizar catálogo
function renderCatalogo(lista = catalogo) {
  const grid = document.getElementById('lista-catalogo');
  grid.innerHTML = lista.map(livro =>
    `<div class="col-6 col-md-4 col-lg-3">
       <div class="card h-100">
         <img src="${livro.capa}" class="card-img-top" alt="Capa de ${livro.titulo}">
         <div class="card-body d-flex flex-column">
           <h6 class="card-title">${livro.titulo}</h6>
           <p class="text-muted"><small>Autor: ${livro.autor}</small></p>
           <button class="btn btn-outline-primary mt-auto add-estante" data-id="${livro.id}">
             Adicionar à estante
           </button>
         </div>
       </div>
     </div>`
  ).join('');
}

function salvar() { localStorage.setItem(LS_KEY, JSON.stringify(estante)); }

// catálogo
document.getElementById('lista-catalogo').addEventListener('click', (evento) => {
  if (evento.target.classList.contains('add-estante')) {
    const id = +evento.target.dataset.id;
    adicionarEstante(id);
  }
});
document.getElementById('lista-catalogo').addEventListener('change', (evento) => {
  if (evento.target.classList.contains('marcar-lido')) {
    const id = +evento.target.dataset.id;
    marcarLido(id, evento.target.checked);
  }
});


function aplicarFiltro(genero) {
  const botoes = document.querySelectorAll('#filtros-genero .nav-link');
  botoes.forEach(b => b.classList.toggle('active', b.dataset.genero === genero));
  const lista = (genero === 'todos') ? catalogo : catalogo.filter(l => l.genero === genero);
  renderCatalogo(lista);
}

function aplicarBusca(textoDigitado) {
  const textoNormalizado = textoDigitado.trim().toLowerCase();
  const listaFiltrada = catalogo.filter(livro =>
    livro.titulo.toLowerCase().includes(textoNormalizado)
  );
  renderCatalogo(listaFiltrada);
}

function initTema() {
  const temaSalvo = getTema();
  document.body.classList.toggle('tema-escuro', temaSalvo === 'escuro');
  document.body.classList.toggle('tema-claro', temaSalvo !== 'escuro');
  const btn = document.getElementById('btn-tema');
  if (btn) {
    btn.addEventListener('click', () => {
      const escuro = document.body.classList.toggle('tema-escuro');
      document.body.classList.toggle('tema-claro', !escuro);
      setTema(escuro ? 'escuro' : 'claro');
    });
  }
}

function adicionarEstante(id) {
  if (!estante.some(livro => livro.id === id)) estante.push({ id, lido: false });
  salvar();
  atualizarContadores();
}

function marcarLido(id, valor) {
  const item = estante.find(livro => livro.id === id);
  if (item) item.lido = !!valor;
  salvar();
  atualizarContadores();
}

function atualizarContadores() {
  const total = estante.length;
  const lidos = estante.filter(l => l.lido).length;
  const badge = document.getElementById('contador-estante');
  const totalTxt = document.getElementById('contador-livros');
  if (badge) badge.textContent = total;
  if (totalTxt) totalTxt.textContent = `Total de livros: ${total} (lidos: ${lidos})`;
}

// boot
window.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('lista-catalogo');
  if (!grid) return; // garante que está na home

  renderCatalogo();
  atualizarContadores();
  initTema();

  // eventos (delegação)
  grid.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('add-estante')) {
      adicionarEstante(+ev.target.dataset.id);
    }
  });
  grid.addEventListener('change', (ev) => {
    if (ev.target.classList.contains('marcar-lido')) {
      marcarLido(+ev.target.dataset.id, ev.target.checked);
    }
  });

  const filtros = document.getElementById('filtros-genero');
  if (filtros) {
    filtros.addEventListener('click', (ev) => {
      if (ev.target.dataset.genero) aplicarFiltro(ev.target.dataset.genero);
    });
  }

  const busca = document.getElementById('barra-pesquisa');
  if (busca) {
    busca.addEventListener('input', (ev) => aplicarBusca(ev.target.value));
  }
});