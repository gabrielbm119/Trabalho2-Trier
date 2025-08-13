//CATÁLOGO
export const catalogo = [
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
    { id: 11, titulo: "Dom Casmurro", autor: "Machado de Assis", capa: "../img/capas-11.jpg", genero: "brasileira" },
    { id: 12, titulo: "O Cortiço", autor: "Aluísio Azevedo", capa: "../img/capas-12.jpg", genero: "brasileira" },
    { id: 13, titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", capa: "../img/capas-13.jpg", genero: "brasileira" },
    { id: 14, titulo: "Iracema", autor: "José de Alencar", capa: "../img/capas-14.jpg", genero: "brasileira" },
    { id: 15, titulo: "Triste Fim de Policarpo Quaresma", autor: "Lima Barreto", capa: "../img/capas-15.jpg", genero: "brasileira" },

    // 🚀 Ficção Científica
    { id: 16, titulo: "A Máquina do Tempo", autor: "H.G. Wells", capa: "../img/capas-16.jpg", genero: "ficcao" },
    { id: 17, titulo: "A Guerra dos Mundos", autor: "H.G. Wells", capa: "../img/capas-17.jpg", genero: "ficcao" },
    { id: 18, titulo: "Da Terra à Lua", autor: "Júlio Verne", capa: "../img/capas-18.jpg", genero: "ficcao" },
    { id: 19, titulo: "Vinte Mil Léguas Submarinas", autor: "Júlio Verne", capa: "../img/capas-19.jpg", genero: "ficcao" },
    { id: 20, titulo: "Eu, Robô", autor: "Isaac Asimov", capa: "../img/capas-20.jpg", genero: "ficcao" },

    // 💭 Filosofia Moderna
    { id: 21, titulo: "Assim Falou Zaratustra", autor: "Friedrich Nietzsche", capa: "../img/capas-21.jpg", genero: "filosofia" },
    { id: 22, titulo: "Meditações", autor: "Marco Aurélio", capa: "../img/capas-22.jpg", genero: "filosofia" },
    { id: 23, titulo: "Discurso do Método", autor: "René Descartes", capa: "../img/capas-23.jpg", genero: "filosofia" },
    { id: 24, titulo: "Crítica da Razão Pura", autor: "Immanuel Kant", capa: "../img/capas-24.jpg", genero: "filosofia" },
    { id: 25, titulo: "O Príncipe", autor: "Nicolau Maquiavel", capa: "../img/capas-25.jpg", genero: "filosofia" }
];

// localStorage helpers simples (chave única)
export const LS_KEY = 'estante';
export const getEstante = () => JSON.parse(localStorage.getItem(LS_KEY) || '[]');
export const setEstante = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

// tema (opcional)
const TEMA_KEY = 'tema';
export const getTema = () => localStorage.getItem(TEMA_KEY) || 'claro';
export const setTema = (t) => localStorage.setItem(TEMA_KEY, t);