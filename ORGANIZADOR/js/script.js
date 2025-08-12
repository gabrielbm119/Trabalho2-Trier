document.addEventListener("DOMContentLoaded", () => {
  const btnTema = document.getElementById("btn-tema");
  const body = document.body;

  // Elementos afetados pelo tema
  const elementos = {
    fundo: document.querySelectorAll(".bg-white, .bg-light"),
    texto: document.querySelectorAll(".text-dark, .text-secondary"),
    borda: document.querySelectorAll(
      ".border-bottom, .border-top, .border-secondary-subtle"
    ),
    lista: document.querySelectorAll(".list-group-item"),
    selects: document.querySelectorAll(".form-select"),
    inputs: document.querySelectorAll(".form-control"),
  };

  let modoEscuroAtivo = false;

  btnTema.addEventListener("click", () => {
    modoEscuroAtivo = !modoEscuroAtivo;

    // Trocar classes do body
    body.classList.toggle("bg-white", !modoEscuroAtivo);
    body.classList.toggle("bg-dark", modoEscuroAtivo);
    body.classList.toggle("tema-claro", !modoEscuroAtivo);
    body.classList.toggle("tema-escuro", modoEscuroAtivo);
    body.classList.toggle("text-white", modoEscuroAtivo);

    // Fundo
    elementos.fundo.forEach((el) => {
      el.classList.toggle("bg-white", !modoEscuroAtivo);
      el.classList.toggle("bg-dark", modoEscuroAtivo);
      el.classList.toggle("bg-light", !modoEscuroAtivo);
      el.classList.toggle("bg-secondary", modoEscuroAtivo);
    });

    // Texto
    elementos.texto.forEach((el) => {
      el.classList.toggle("text-dark", !modoEscuroAtivo);
      el.classList.toggle("text-white", modoEscuroAtivo);
      el.classList.toggle("text-secondary", !modoEscuroAtivo);
      el.classList.toggle("text-light", modoEscuroAtivo);
    });

    // Bordas
    elementos.borda.forEach((el) => {
      el.classList.toggle("border-secondary-subtle", !modoEscuroAtivo);
      el.classList.toggle("border-light", modoEscuroAtivo);
    });

    // Lista de tarefas
    elementos.lista.forEach((el) => {
      el.classList.toggle("bg-white", !modoEscuroAtivo);
      el.classList.toggle("bg-dark", modoEscuroAtivo);
      el.classList.toggle("text-dark", !modoEscuroAtivo);
      el.classList.toggle("text-light", modoEscuroAtivo);
    });

    // Inputs e selects
    elementos.selects.forEach((el) => {
      el.classList.toggle("bg-white", !modoEscuroAtivo);
      el.classList.toggle("bg-dark", modoEscuroAtivo);
      el.classList.toggle("text-dark", !modoEscuroAtivo);
      el.classList.toggle("text-light", modoEscuroAtivo);
      el.classList.toggle("border-light", modoEscuroAtivo);
    });

    elementos.inputs.forEach((el) => {
      el.classList.toggle("bg-white", !modoEscuroAtivo);
      el.classList.toggle("bg-dark", modoEscuroAtivo);
      el.classList.toggle("text-dark", !modoEscuroAtivo);
      el.classList.toggle("text-light", modoEscuroAtivo);
      el.classList.toggle("border-light", modoEscuroAtivo);
    });
  });
});
