const cardapio = [
  { id: 1, nome: "Hambúrguer 🍔", preco: 12.00 },
  { id: 2, nome: "Batata Frita 🍟", preco: 8.00 },
  { id: 3, nome: "Refrigerante 🥤", preco: 6.00 },
  { id: 4, nome: "Milkshake 🍨", preco: 10.00 },
  { id: 5, nome: "Pizza 🍕", preco: 15.00 },
  { id: 6, nome: "Salada 🥗", preco: 9.00 },
  { id: 7, nome: "Cachorro-Quente 🌭", preco: 11.00 },
  { id: 8, nome: "Nuggets 🍗", preco: 7.00 },
  { id: 9, nome: "Sorvete 🍦", preco: 5.00 },
  { id: 10, nome: "Água Mineral 💧", preco: 3.00 },
  { id: 11, nome: "Suco Natural 🧃", preco: 7.00 },
  { id: 12, nome: "Café ☕", preco: 4.00 },
  { id: 13, nome: "Pão de Queijo 🧀", preco: 5.00 },
  { id: 14, nome: "Torrada 🥖", preco: 4.50 },
  { id: 15, nome: "Waffle 🧇", preco: 6.50 },
  { id: 16, nome: "Panqueca 🥞", preco: 7.50 },
  { id: 17, nome: "Croissant 🥐", preco: 6.00 },
  { id: 18, nome: "Brownie 🍫", preco: 6.00 }
];

// 1. Criar array 'cardapio' com todos os itens (feito acima)
// 2. Criar um objeto 'carrinho' para armazenar os itens adicionados
// 3. Criar a função 'adicionarAoCarrinho(id)' que:
//    - Busca o item no cardápio
//    - Verifica se já está no carrinho
//    - Se sim, incrementa a quantidade
//    - Se não, adiciona com quantidade = 1
//    - Atualiza o DOM com novo conteúdo
//    - Salva carrinho no localStorage
// 4. Criar a função 'atualizarCarrinhoNaTela()' para:
//    - Mostrar lista de itens, quantidades, e total
// 5. Criar a função 'calcularTotal()'
// 6. Criar função 'mostrarFeedback()' com alerta ou badge