// estante.js
import { catalogo, getEstante, setEstante, getTema, setTema } from './dados.js';

let estante = getEstante(); // [{id, lido:false}]

function atualizarContadores() {
    const total = estante.length;
    const lidos = estante.filter(l => l.lido).length;
    const badge = document.getElementById('contador-estante');
    if (badge) badge.textContent = total;
    const txt = document.getElementById('contador-livros');
    if (txt) txt.textContent = `Total de livros: ${total} (lidos: ${lidos})`;
}

function renderEstante() {
    const grid = document.getElementById('lista-estante');
    if (!grid) return;
    grid.innerHTML = estante.map(({ id, lido }) => {
        const livroCatalogo = catalogo.find(item => item.id === id);
        if (!livroCatalogo) return '';
        return `
      <div class="col-md-3">
        <div class="card h-100">
          <img src="${livroCatalogo.capa}" class="card-img-top" alt="Capa de ${livroCatalogo.titulo}">
          <div class="card-body">
            <h5 class="card-title">${livroCatalogo.titulo}</h5>
            <p class="card-text"><small>Autor: ${livroCatalogo.autor}</small></p>
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
}

function aplicarFiltro(genero) {
    const botoes = document.querySelectorAll('#filtros-genero .nav-link');
    botoes.forEach(b => b.classList.toggle('active', b.dataset.genero === genero));
    const lista = (genero === 'todos') ? catalogo : catalogo.filter(l => l.genero === genero);
    renderEstante(lista);
}

function aplicarBusca(textoDigitado) {
    const textoNormalizado = textoDigitado.trim().toLowerCase();
    const listaFiltrada = catalogo.filter(livro =>
        livro.titulo.toLowerCase().includes(textoNormalizado)
    );
    renderEstante(listaFiltrada);
}

function removerEstante(id) {
    estante = estante.filter(l => l.id !== id);
    setEstante(estante);
    renderEstante();
    atualizarContadores();
}

function marcarLido(id, valor) {
    const item = estante.find(l => l.id === id);
    if (item) item.lido = !!valor;
    setEstante(estante);
    atualizarContadores();
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

// ——— boot da ESTANTE ———
window.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('lista-estante');
    if (!grid) return; // garante que está na estante

    renderEstante();
    atualizarContadores();
    initTema();

    // delegação
    grid.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('remover-estante')) {
            removerEstante(+ev.target.dataset.id);
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
