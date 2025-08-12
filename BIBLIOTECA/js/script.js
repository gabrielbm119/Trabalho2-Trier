//CATÁLOGO
const catalogo = [
  // 📚 Terror
  { id: 1, titulo: "Drácula", autor: "Bram Stoker", capa: "../img/capas-1.jpg", genero: "terror" },
  { id: 2, titulo: "Frankenstein", autor: "Mary Shelley", capa: "../img/capas-2.jpg", genero: "terror" },
  { id: 3, titulo: "O Médico e o Monstro", autor: "Robert Louis Stevenson", capa: "../img/capas-3.jpg", genero: "terror" },
  { id: 4, titulo: "A Volta do Parafuso", autor: "Henry James", capa: "../img/capas-4.jpg", genero: "terror" },
  { id: 5, titulo: "Contos de Terror", autor: "Edgar Allan Poe", capa: "../img/capas-5.jpg", genero: "terror" },

  // ❤️ Romance
  { id: 6, titulo: "Orgulho e Preconceito", autor: "Jane Austen", capa: "../img/capas-6.jpg", genero: "romance" },
  { id: 7, titulo: "Jane Eyre", autor: "Charlotte Brontë", capa: "../img/capas-7.jpg", genero: "romance" },
  { id: 8, titulo: "E o Vento Levou", autor: "Margaret Mitchell", capa: "../img/capas-8.jpg", genero: "romance" },
  { id: 9, titulo: "Anna Kariênina", autor: "Liev Tolstói", capa: "../img/capas-9.jpg", genero: "romance" },
  { id: 10, titulo: "O Morro dos Ventos Uivantes", autor: "Emily Brontë", capa: "../img/capas-10.jpg", genero: "romance" },

  // 🇧🇷 Literatura Brasileira
  { id: 11, titulo: "Dom Casmurro", autor: "Machado de Assis", capa: "../img/capas-11.jpg", genero: "literatura brasileira" },
  { id: 12, titulo: "O Cortiço", autor: "Aluísio Azevedo", capa: "../img/capas-12.jpg", genero: "literatura brasileira" },
  { id: 13, titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", capa: "../img/capas-13.jpg", genero: "literatura brasileira" },
  { id: 14, titulo: "Iracema", autor: "José de Alencar", capa: "../img/capas-14.jpg", genero: "literatura brasileira" },
  { id: 15, titulo: "Triste Fim de Policarpo Quaresma", autor: "Lima Barreto", capa: "../img/capas-15.jpg", genero: "literatura brasileira" },

  // 🚀 Ficção Científica
  { id: 16, titulo: "A Máquina do Tempo", autor: "H.G. Wells", capa: "../img/capas-16.jpg", genero: "ficcao cientifica" },
  { id: 17, titulo: "A Guerra dos Mundos", autor: "H.G. Wells", capa: "../img/capas-17.jpg", genero: "ficcao cientifica" },
  { id: 18, titulo: "Da Terra à Lua", autor: "Júlio Verne", capa: "../img/capas-18.jpg", genero: "ficcao cientifica" },
  { id: 19, titulo: "Vinte Mil Léguas Submarinas", autor: "Júlio Verne", capa: "../img/capas-19.jpg", genero: "ficcao cientifica" },
  { id: 20, titulo: "Eu, Robô", autor: "Isaac Asimov", capa: "../img/capas-20.jpg", genero: "ficcao cientifica" },

  // 💭 Filosofia Moderna
  { id: 21, titulo: "Assim Falou Zaratustra", autor: "Friedrich Nietzsche", capa: "../img/capas-21.jpg", genero: "filosofia moderna" },
  { id: 22, titulo: "Meditações", autor: "Marco Aurélio", capa: "../img/capas-22.jpg", genero: "filosofia moderna" },
  { id: 23, titulo: "Discurso do Método", autor: "René Descartes", capa: "../img/capas-23.jpg", genero: "filosofia moderna" },
  { id: 24, titulo: "Crítica da Razão Pura", autor: "Immanuel Kant", capa: "../img/capas-24.jpg", genero: "filosofia moderna" },
  { id: 25, titulo: "O Príncipe", autor: "Nicolau Maquiavel", capa: "../img/capas-25.jpg", genero: "filosofia moderna" }
];


//Renderizar catálogo
function renderCatalogo(lista) {
  const grid = document.getElementById('lista-catalogo');
  grid.innerHTML = lista.map(l =>
    `<div class="col-6 col-md-4 col-lg-3">
       <div class="card h-100">
         <img src="${l.capa}" class="card-img-top" alt="Capa de ${l.titulo}">
         <div class="card-body d-flex flex-column">
           <h6 class="card-title">${l.titulo}</h6>
           <p class="text-muted"><small>Autor: ${l.autor}</small></p>
           <button class="btn btn-outline-primary mt-auto add-estante" data-id="${l.id}">
             Adicionar à estante
           </button>
           <div class="form-check mt-2">
             <input class="form-check-input marcar-lido" id="lido-${l.id}" type="checkbox" data-id="${l.id}">
             <label class="form-check-label" for="lido-${l.id}">Lido</label>
           </div>
         </div>
       </div>
     </div>`
  ).join('');
}

//estante + localStorage
const LS_KEY = 'estante';
let estante = JSON.parse(localStorage.getItem(LS_KEY) || '[]'); // array de ids ou objetos

function salvar() { localStorage.setItem(LS_KEY, JSON.stringify(estante)); }

// catálogo
document.getElementById('lista-catalogo').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-estante')) {
    const id = +e.target.dataset.id;
    adicionarEstante(id);
  }
});
document.getElementById('lista-catalogo').addEventListener('change', (e) => {
  if (e.target.classList.contains('marcar-lido')) {
    const id = +e.target.dataset.id;
    marcarLido(id, e.target.checked);
  }
});

// filtros genero
document.getElementById('filtros-genero').addEventListener('click', (e) => {
  if (e.target.dataset.genero) aplicarFiltro(e.target.dataset.genero);
});

// busca
document.getElementById('barra-pesquisa').addEventListener('input', (e) => {
  aplicarBusca(e.target.value);
});

//tema
document.getElementById('btn-tema').addEventListener('click', () => {
  document.body.classList.toggle('tema-escuro');
  document.body.classList.toggle('tema-claro');
  // opcional: persistir tema no localStorage
});

function adicionarEstante(id) {
  if (!estante.some(l => l.id === id)) estante.push({ id, lido: false });
  salvar();
  renderEstante();
  atualizarContadores();
}

function marcarLido(id, valor) {
  const item = estante.find(l => l.id === id);
  if (item) item.lido = !!valor;
  salvar();
  atualizarContadores();
}

function aplicarFiltro(genero) {
  document.querySelectorAll('#filtros-genero .nav-link')
    .forEach(b => b.classList.toggle('active', b.dataset.genero === genero));
  const lista = (genero === 'todos')
    ? catalogo
    : catalogo.filter(l => l.genero === genero);
  renderCatalogo(lista);
}

function aplicarBusca(q) {
  const s = q.trim().toLowerCase();
  const lista = catalogo.filter(l => l.titulo.toLowerCase().includes(s));
  renderCatalogo(lista);
}

function renderEstante() {
  const el = document.getElementById('lista-estante');
  el.innerHTML = estante.map(({ id, lido }) => {
    const l = catalogo.find(x => x.id === id);
    return `
      <div class="col-md-3">
        <div class="card h-100">
          <img src="${l.capa}" class="card-img-top" alt="Capa de ${l.titulo}">
          <div class="card-body">
            <h5 class="card-title">${l.titulo}</h5>
            <p class="card-text"><small>Autor: ${l.autor}</small></p>
            <div class="d-flex gap-2">
              <div class="form-check">
                <input class="form-check-input marcar-lido" type="checkbox"
                  id="lido-${id}" data-id="${id}" ${lido ? 'checked' : ''}>
                <label class="form-check-label" for="lido-${id}">Lido</label>
              </div>
              <button class="btn btn-danger btn-sm remover-estante" data-id="${id}">
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  // delegação para remover/lido dentro da estante
  el.onclick = (e) => {
    if (e.target.classList.contains('remover-estante')) {
      const id = +e.target.dataset.id;
      estante = estante.filter(l => l.id !== id);
      salvar(); renderEstante(); atualizarContadores();
    }
  };
  el.onchange = (e) => {
    if (e.target.classList.contains('marcar-lido')) {
      marcarLido(+e.target.dataset.id, e.target.checked);
    }
  };
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
  // tema opcional
  renderCatalogo(catalogo);
  renderEstante();
  atualizarContadores();

  // botão 📚 rola até a estante
  const btn = document.getElementById('btn-estante');
  if (btn) btn.addEventListener('click', () =>
    document.getElementById('estante')?.scrollIntoView({ behavior: 'smooth' })
  );
});
