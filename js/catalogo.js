"use strict";

const listaProdutos = document.querySelector(".lista-produtos");
const campoBusca = document.querySelector("#campo-busca");
const filtros = document.querySelectorAll(".filtro");

let categoriaAtual = "Todos";
let termoBusca = "";

function renderizarProdutos() {
    listaProdutos.innerHTML = "";

    const produtosFiltrados = produtos.filter((produto) => {
        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            produto.categoria === categoriaAtual;

        const correspondeBusca =
            produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
            produto.descricao.toLowerCase().includes(termoBusca.toLowerCase());

        return correspondeCategoria && correspondeBusca;
    });

    document.querySelector("#resultado-busca").textContent = produtosFiltrados.length
        ? `${produtosFiltrados.length} produtos encontrados.`
        : "Nenhum produto encontrado. Tente outra busca ou categoria.";

    produtosFiltrados.forEach((produto) => {
        const card = document.createElement("div");
        card.classList.add("card-produto");

        const urlProduto = `produto.html?id=${encodeURIComponent(produto.id)}`;

        card.innerHTML = `
            <a class="produto-link-imagem" href="${urlProduto}" aria-label="Ver detalhes de ${produto.nome}">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </a>

            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria}</span>

                <h3>
                    <a class="produto-link-nome" href="${urlProduto}">
                        ${produto.nome}
                    </a>
                </h3>

                <p>${produto.descricao}</p>

                <div class="produto-footer">
                    <strong>R$ ${produto.preco.toFixed(2).replace(".", ",")}</strong>

                    <div class="controle-quantidade">
                        <button type="button" class="btn-quantidade diminuir" aria-label="Diminuir quantidade de ${produto.nome}">-</button>
                        <span class="quantidade" aria-live="polite">1</span>
                        <button type="button" class="btn-quantidade aumentar" aria-label="Aumentar quantidade de ${produto.nome}">+</button>
                    </div>

                    <button type="button" class="btn-adicionar">
                        Adicionar
                    </button>

                    <a class="btn-ver-detalhes" href="${urlProduto}">
                        Ver detalhes
                    </a>
                </div>
            </div>
        `;

        const imagem = card.querySelector("img");
        imagem.loading = "lazy";

        imagem.addEventListener("error", () => {
            imagem.src = "assets/logo/logo_padaria_acoriana.png";
        }, { once: true });

        const quantidade = card.querySelector(".quantidade");
        const diminuir = card.querySelector(".diminuir");
        const aumentar = card.querySelector(".aumentar");
        const botaoAdicionar = card.querySelector(".btn-adicionar");

        let valorQuantidade = 1;

        diminuir.addEventListener("click", () => {
            if (valorQuantidade > 1) {
                valorQuantidade--;
                quantidade.textContent = valorQuantidade;
            }
        });

        aumentar.addEventListener("click", () => {
            valorQuantidade = Math.min(QUANTIDADE_MAXIMA, valorQuantidade + 1);
            quantidade.textContent = valorQuantidade;
        });

        botaoAdicionar.addEventListener("click", () => {
            adicionarAoCarrinho(produto, valorQuantidade);
        });

        listaProdutos.appendChild(card);
    });
}

campoBusca.addEventListener("input", () => {
    termoBusca = campoBusca.value;
    renderizarProdutos();
});

filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
        filtros.forEach((botao) => {
            botao.classList.remove("ativo");
        });

        filtro.classList.add("ativo");

        filtros.forEach((botao) => {
            botao.setAttribute("aria-pressed", String(botao === filtro));
        });

        categoriaAtual = filtro.dataset.categoria;

        renderizarProdutos();
    });
});

filtros.forEach((botao) => {
    botao.setAttribute("aria-pressed", String(botao.classList.contains("ativo")));
});

renderizarProdutos();