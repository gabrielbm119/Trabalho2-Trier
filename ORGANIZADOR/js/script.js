// =========================================================
//  Seleção de Elementos do DOM e Variáveis Globais
// =========================================================

// Elementos do formulário
const formAdicionarTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("titulo-tarefa");
const inputData = document.getElementById("data-tarefa");

// Elementos da lista de tarefas e controles
const listaDeTarefas = document.getElementById("lista-tarefas");
const seletorOrdenar = document.getElementById("ordenar");
const seletorFiltro = document.getElementById("filtro");

// Elementos do tema
const botaoTema = document.getElementById("btn-tema");
const corpoDaPagina = document.body;

// Array global para armazenar todas as tarefas
let tarefas = [];

// Remove a tarefa de exemplo que está no HTML
document.querySelector(".list-group-item")?.remove();

// =========================================================
//  Funções de Persistência e Renderização
// =========================================================

/**
 * Carrega as tarefas salvas no localStorage ao iniciar a aplicação.
 */
const carregarTarefasDoLocalStorage = () => {
  const tarefasSalvas = localStorage.getItem("agendooTarefas");
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
    atualizarListaDeTarefas();
  }
};

/**
 * Salva o array de tarefas no localStorage.
 */
const salvarTarefasNoLocalStorage = () => {
  localStorage.setItem("agendooTarefas", JSON.stringify(tarefas));
};

/**
 * Renderiza a lista de tarefas na tela, aplicando filtro e ordenação.
 */
const atualizarListaDeTarefas = () => {
  listaDeTarefas.innerHTML = ""; // Limpa a lista antes de renderizar

  let tarefasFiltradas = [...tarefas];

  // Aplica o filtro de status (pendente/concluída)
  const filtro = seletorFiltro.value;
  if (filtro === "pendentes") {
    tarefasFiltradas = tarefasFiltradas.filter((t) => !t.concluida);
  } else if (filtro === "concluidas") {
    tarefasFiltradas = tarefasFiltradas.filter((t) => t.concluida);
  }

  // Aplica a ordenação por data ou título
  const ordenacao = seletorOrdenar.value;
  if (ordenacao === "data") {
    tarefasFiltradas.sort((a, b) => new Date(a.data) - new Date(b.data));
  } else if (ordenacao === "titulo") {
    tarefasFiltradas.sort((a, b) => a.titulo.localeCompare(b.titulo));
  }

  // Cria e adiciona o elemento de cada tarefa filtrada e ordenada
  tarefasFiltradas.forEach((tarefa) => {
    const elementoTarefa = criarElementoHTMLDaTarefa(tarefa);
    listaDeTarefas.appendChild(elementoTarefa);
  });

  // Garante que o tema seja aplicado aos novos elementos
  aplicarTemaDoCorpo();
};

/**
 * Cria o elemento HTML de uma tarefa e adiciona os listeners de eventos.
 * @param {object} tarefa - O objeto da tarefa.
 * @returns {HTMLElement} O elemento HTML da tarefa.
 */
const criarElementoHTMLDaTarefa = (tarefa) => {
  const tarefaDiv = document.createElement("div");

  // CORREÇÃO: Resolve o problema de fuso horário.
  // Pega a data da tarefa (ex: "2025-08-15")
  const [ano, mes, dia] = tarefa.data.split("-").map(Number);
  // Cria um objeto de data de forma segura para evitar que o fuso horário
  // altere a data para o dia anterior. O mês em JavaScript é base zero.
  const dataParaExibicao = new Date(ano, mes - 1, dia);
  const dataFormatada = dataParaExibicao.toLocaleDateString("pt-BR");

  // Adiciona a classe de opacidade se a tarefa estiver concluída
  const classeOpacidade = tarefa.concluida ? "opacity-50" : "";

  tarefaDiv.className = `tarefa d-flex justify-content-between align-items-center shadow bg-white mb-3 p-2 rounded ${classeOpacidade}`;
  tarefaDiv.dataset.id = tarefa.id;

  tarefaDiv.innerHTML = `
    <div class="d-flex align-items-center gap-3">
      <input type="checkbox" class="form-check-input" style="width: 30px; height: 30px" ${
        tarefa.concluida ? "checked" : ""
      } />
      <span class="titulo-tarefa text-dark ${
        tarefa.concluida ? "text-decoration-line-through" : ""
      }">${tarefa.titulo}</span>
    </div>
    <div class="d-flex align-items-center gap-5">
      <!-- Adiciona a classe de sucesso se a tarefa estiver concluída -->
      <span class="badge ${
        tarefa.concluida ? "bg-success text-white" : "bg-light text-dark"
      }">${dataFormatada}</span>
      <button class="btn btn-outline-danger btn-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </button>
    </div>
  `;

  // Listener para o botão de exclusão
  tarefaDiv
    .querySelector(".btn-outline-danger")
    .addEventListener("click", () => {
      tarefas = tarefas.filter((t) => t.id !== tarefa.id);
      salvarTarefasNoLocalStorage();
      atualizarListaDeTarefas();
    });

  // Listener para o checkbox de conclusão
  tarefaDiv
    .querySelector(".form-check-input")
    .addEventListener("change", (e) => {
      const tarefaIndex = tarefas.findIndex((t) => t.id === tarefa.id);
      if (tarefaIndex !== -1) {
        tarefas[tarefaIndex].concluida = e.target.checked;
        salvarTarefasNoLocalStorage();
        atualizarListaDeTarefas();
      }
    });

  return tarefaDiv;
};

// =========================================================
//  Função do Tema
// =========================================================

/**
 * Aplica as classes de tema a todos os elementos da página.
 */
const aplicarTemaDoCorpo = () => {
  const isDark = corpoDaPagina.classList.contains("tema-escuro");

  // Seleciona todos os elementos que precisam de ajuste de cor
  const tituloPrincipal = document.querySelector("h1 strong");
  const subtituloPrincipal = document.querySelector("h1 span");
  const titulosH2 = document.querySelectorAll("h2");
  const inputsECaixasDeSelecao = document.querySelectorAll(
    ".form-control, .form-select"
  );
  const footer = document.querySelector("footer");
  const tarefaItens = document.querySelectorAll(".tarefa");

  // =========================================================
  // CORREÇÃO: Seletores e lógica para o rodapé
  // =========================================================
  // Seleciona todos os elementos de texto no rodapé.
  // Seleciona os contêineres de texto com a classe `.textoFooter`
  const textoFooter = document.querySelectorAll(".textoFooter");
  // Seleciona todos os ícones SVG dentro do rodapé.
  const footerIcons = document.querySelectorAll("footer svg");

  // Ajusta o corpo da página
  corpoDaPagina.className = isDark
    ? "tema-escuro bg-dark"
    : "tema-claro bg-white";

  // Ajusta o cabeçalho
  if (isDark) {
    tituloPrincipal.classList.replace("text-success", "text-info");
    subtituloPrincipal.classList.replace("text-secondary", "text-light");
  } else {
    tituloPrincipal.classList.replace("text-info", "text-success");
    subtituloPrincipal.classList.replace("text-light", "text-secondary");
  }

  // Ajusta títulos (h2), inputs, seletores e o rodapé
  titulosH2.forEach((titulo) => {
    if (isDark) {
      titulo.classList.replace("text-dark", "text-white");
    } else {
      titulo.classList.replace("text-white", "text-dark");
    }
  });

  inputsECaixasDeSelecao.forEach((elemento) => {
    if (isDark) {
      elemento.classList.replace("bg-white", "bg-dark");
      elemento.classList.replace("text-dark", "text-white");
    } else {
      elemento.classList.replace("bg-dark", "bg-white");
      elemento.classList.replace("text-white", "text-dark");
    }
  });

  // CORREÇÃO: Adiciona a lógica para o background do footer
  // Remove as classes de background existentes e adiciona a correta
  footer.classList.remove("bg-white", "bg-dark");
  footer.classList.add(isDark ? "bg-dark" : "bg-white");

  footer.classList.toggle("border-secondary-subtle", !isDark);
  footer.classList.toggle("border-light-subtle", isDark);

  // Aplica o tema aos elementos de texto do rodapé.
  textoFooter.forEach((elemento) => {
    elemento.classList.toggle("text-dark", !isDark);
    elemento.classList.toggle("text-white", isDark);
  });

  // Aplica o tema aos ícones SVG no rodapé.
  footerIcons.forEach((icon) => {
    icon.style.fill = isDark ? "white" : "currentColor";
  });

  // Ajusta os itens da lista de tarefas
  tarefaItens.forEach((item) => {
    const titulo = item.querySelector(".titulo-tarefa");
    const badge = item.querySelector(".badge");
    const isConcluida = item.classList.contains("opacity-50");

    // Lógica para o tema escuro
    if (isDark) {
      // Aplica classes de tema escuro
      item.classList.remove("bg-white");
      item.classList.add("bg-dark");
      titulo.classList.remove("text-dark");
      titulo.classList.add("text-white");
      item.classList.remove("shadow");
      item.classList.add("sombraDark");

      // Se a tarefa não estiver concluída, ajusta o badge para o tema escuro
      if (!isConcluida) {
        badge.classList.remove("bg-light", "text-dark");
        badge.classList.add("bg-secondary", "text-light");
      }
    } else {
      // Lógica para o tema claro
      // Aplica classes de tema claro
      item.classList.remove("bg-dark");
      item.classList.add("bg-white");
      titulo.classList.remove("text-white");
      titulo.classList.add("text-dark");
      item.classList.remove("sombraDark");
      item.classList.add("shadow");

      // Se a tarefa não estiver concluída, ajusta o badge para o tema claro
      if (!isConcluida) {
        badge.classList.remove("bg-secondary", "text-light");
        badge.classList.add("bg-light", "text-dark");
      }
    }

    // CORREÇÃO: Garante que o badge da tarefa concluída seja sempre 'bg-success'
    if (isConcluida) {
      badge.classList.remove(
        "bg-light",
        "text-dark",
        "bg-secondary",
        "text-light"
      );
      badge.classList.add("bg-success", "text-white");
    }
  });
};

// =========================================================
//  Funções para o layout do rodapé
// =========================================================

// ADICIONADO: Esta função ajusta o layout para que o rodapé
// fique sempre no final da página, sem precisar de fixed-bottom no HTML
const aplicarEstilosFooter = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      margin: 0;
    }
    main {
      flex-grow: 1;
    }
    footer {
      margin-top: auto;
    }
  `;
  document.head.appendChild(style);
};

// =========================================================
//  Event Listeners Principais
// =========================================================

// Adiciona uma nova tarefa ao enviar o formulário
formAdicionarTarefa.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const data = inputData.value;

  if (titulo && data) {
    const novaTarefa = {
      id: Date.now(),
      titulo,
      data,
      concluida: false,
    };
    tarefas.push(novaTarefa);
    salvarTarefasNoLocalStorage();
    atualizarListaDeTarefas();
    formAdicionarTarefa.reset();
  }
});

// Eventos para ordenar e filtrar a lista
seletorOrdenar.addEventListener("change", atualizarListaDeTarefas);
seletorFiltro.addEventListener("change", atualizarListaDeTarefas);

// Evento para alternar o tema da página
botaoTema.addEventListener("click", () => {
  corpoDaPagina.classList.toggle("tema-escuro");
  corpoDaPagina.classList.toggle("bg-dark");
  corpoDaPagina.classList.toggle("bg-white");
  aplicarTemaDoCorpo();
});

// =========================================================
//  Inicialização da Aplicação
// =========================================================

// Carrega as tarefas salvas assim que a página é carregada
carregarTarefasDoLocalStorage();

// Aplica os estilos do rodapé na inicialização
aplicarEstilosFooter();
