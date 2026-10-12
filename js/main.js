// JavaScript principal do site

const anoAtual = document.getElementById("ano-atual");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}
