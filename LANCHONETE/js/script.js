const cardapio = [
    { id: 1, nome: "Hambúrguer Simples", preco: 14.00, imagem: "../img/hamburguer1.webp" },
    { id: 2, nome: "Cheddar Duplo", preco: 19.00, imagem: "../img/hamburguer2.webp" },
    { id: 3, nome: "Duplo Bacon", preco: 20.00, imagem: "../img/hamburguer3.webp" },
    { id: 4, nome: "Duplo Onion", preco: 18.00, imagem: "../img/hamburguer4.webp" },
    { id: 5, nome: "Big Duplo", preco: 22.00, imagem: "../img/hamburguer5.webp" },
    { id: 6, nome: "Cheeseburger Duplo", preco: 17.00, imagem: "../img/hamburguer6.webp" },
    { id: 7, nome: "Cheeseburger", preco: 13.00, imagem: "../img/hamburguer7.webp" },
    { id: 8, nome: "Burger Onion", preco: 12.00, imagem: "../img/hamburguer8.webp" },
    { id: 9, nome: "Frango Duplo", preco: 16.00, imagem: "../img/frango1.webp" },
    { id: 10, nome: "Frango Simples", preco: 11.00, imagem: "../img/frango2.webp" },
    { id: 11, nome: "Burger Jr", preco: 9.00, imagem: "../img/hamburguerjr.webp" },
    { id: 12, nome: "Frango Jr", preco: 8.00, imagem: "../img/frangojr.webp" },
    { id: 13, nome: "Batata Frita", preco: 7.00, imagem: "../img/batatafrita.webp" },
    { id: 14, nome: "Nuggets", preco: 6.50, imagem: "../img/nuggets.webp" },
    { id: 15, nome: "Refrigerante", preco: 5.00, imagem: "../img/bebida1.webp" },
    { id: 16, nome: "Suco Integral", preco: 6.50, imagem: "../img/bebida2.webp" },
    { id: 17, nome: "Sundae", preco: 7.50, imagem: "../img/sobremesa1.webp" },
    { id: 18, nome: "Milkshake", preco: 8.00, imagem: "../img/sobremesa2.webp" }
];

// 🔽 2. Objeto do carrinho
let carrinho = {};

// 🔽 3. Função: Adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const item = cardapio.find(produto => produto.id === id);
    if (!item) return;

    if (carrinho[id]) {
        carrinho[id].quantidade += 1;
    } else {
        carrinho[id] = {
            nome: item.nome,
            preco: item.preco,
            quantidade: 1
        };
    }

    salvarCarrinho();
    atualizarCarrinhoNaTela();
    mostrarFeedback(item.nome);
}

function atualizarCarrinhoNaTela() {
    const container = document.getElementById("itens-carrinho");
    container.innerHTML = "";

    for (let id in carrinho) {
        const item = carrinho[id];
        const totalItem = item.preco * item.quantidade;

        const div = document.createElement("div");
        div.className = "mb-2 d-flex justify-content-between align-items-center";
        div.innerHTML = `
            <p class="mb-0"><strong>${item.nome}</strong> x${item.quantidade
            } — R$ ${totalItem.toFixed(2)}</p>
            <button class="btn btn-sm btn-danger remover-item" data-id="${id}">
                <i class="bi bi-trash"></i>
            </button>
        `;
        container.appendChild(div);
    }

    ativarBotoesRemover(); // 🔹 chama aqui
    calcularTotal();
}

function ativarBotoesRemover() {
    document.querySelectorAll(".remover-item").forEach((botao) => {
        botao.addEventListener("click", () => {
            const id = botao.dataset.id;
            delete carrinho[id]; // remove completamente
            salvarCarrinho();
            atualizarCarrinhoNaTela();
        });
    });
}

// 🔽 5. Calcular total do pedido
function calcularTotal() {
    let total = 0;
    for (let id in carrinho) {
        const item = carrinho[id];
        total += item.preco * item.quantidade;
    }

    document.getElementById('total-pedido').innerText = `R$ ${total.toFixed(2)}`;
    atualizarBadge();
}

// 🔽 6. Mostrar feedback visual
function mostrarFeedback(nome) {
    // Exemplo simples: alert
    alert(`✔️ ${nome} adicionado ao carrinho!`);
}

// 🔽 7. Badge com número de itens
function atualizarBadge() {
    const badge = document.getElementById('badge-carrinho');
    const quantidadeItens = document.getElementById('quantidade-itens');
    let totalItens = 0;
    for (let id in carrinho) {
        totalItens += carrinho[id].quantidade;
    }
    badge.innerText = totalItens;
    quantidadeItens.innerText = totalItens;
}

// 🔽 8. Salvar e carregar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const salvo = localStorage.getItem('carrinho');
    if (salvo) {
        carrinho = JSON.parse(salvo);
        atualizarCarrinhoNaTela();
    }
}

// 🔽 9. Evento para botões "Adicionar"
function ativarBotoesAdicionar() {
    document.querySelectorAll('.adicionar').forEach(botao => {
        botao.addEventListener('click', () => {
            const id = parseInt(botao.dataset.id);
            adicionarAoCarrinho(id);
        });
    });
}

// 🔽 10. Finalizar pedido
document.getElementById('finalizar-pedido').addEventListener('click', () => {
    carrinho = {};
    salvarCarrinho();
    atualizarCarrinhoNaTela();
});

// 🔽 11. Gerar os cards (opcional, se estiver fazendo via JS)
function gerarCards() {
    const container = document.getElementById('lista-produtos');
    container.innerHTML = '';

    cardapio.forEach(item => {
        const card = `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card p-2 h-100">
          <img style="object-fit: cover; height: 160px;" src="${item.imagem}" class="card-img-top img-fluid mt-1" alt="${item.nome}">
          <div class="card-body d-flex flex-column justify-content-end align-items-bottom">
            <h3 class="card-title pb-2">${item.nome}</h3>
            <div class="row justify-content-between align-items-center">
              <h4 class="card-text pe-0  m-0 col-12 col-md-12 col-lg-6">R$ ${item.preco.toFixed(2)}</h4>
              <button class="btn btn-success col-12 col-md-12 col-lg-2 adicionar mt-auto" data-id="${item.id}"><i class="bi bi-cart col-2 p-0" style="color:#FFE8BE ;"></i></button>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;
        container.innerHTML += card;
    });

    ativarBotoesAdicionar(); // ativar os botões após gerar os cards
}

// 🔽 12. Ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    gerarCards(); // se usar JS para gerar produtos
    carregarCarrinho();
});