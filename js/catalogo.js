// Catálogo: renderização de produtos, busca e filtros combinados.
"use strict";

const listaProdutos = document.querySelector(".lista-produtos");
const campoBusca = document.querySelector("#campo-busca");
const filtros = document.querySelectorAll(".filtro");

// Estado dos filtros aplicado em conjunto a cada renderização.
let categoriaAtual = "Todos";
let termoBusca = "";

/** Reconstrói os cartões com os produtos que atendem à categoria e à busca. */
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

    // O estado vazio explica por que não há cartões e anuncia a contagem.
    document.querySelector("#resultado-busca").textContent = produtosFiltrados.length
        ? `${produtosFiltrados.length} produtos encontrados.`
        : "Nenhum produto encontrado. Tente outra busca ou categoria.";

    produtosFiltrados.forEach((produto) => {
        // Os dados vêm exclusivamente do arquivo estático produtos.js.
        const card = document.createElement("div");
        card.classList.add("card-produto");

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria}</span>

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <div class="produto-footer">
                    <strong>R$ ${produto.preco.toFixed(2).replace(".", ",")}</strong>

                    <div class="controle-quantidade">
                        <button class="btn-quantidade diminuir">-</button>
                        <span class="quantidade">1</span>
                        <button class="btn-quantidade aumentar">+</button>
                    </div>

                    <button class="btn-adicionar">
                        Adicionar
                    </button>
                </div>
            </div>
        `;

        // Identifica os controles para tecnologias assistivas.
        card.querySelector(".diminuir").setAttribute("aria-label", `Diminuir quantidade de ${produto.nome}`);
        card.querySelector(".aumentar").setAttribute("aria-label", `Aumentar quantidade de ${produto.nome}`);
        const imagem = card.querySelector("img");
        imagem.loading = "lazy";
        // Usa a marca local se uma imagem demonstrativa remota estiver indisponível.
        imagem.addEventListener("error", () => {
            imagem.src = "assets/logo/logo_padaria_acoriana.png";
        }, { once: true });
        const quantidade = card.querySelector(".quantidade");
        const diminuir = card.querySelector(".diminuir");
        const aumentar = card.querySelector(".aumentar");
        const botaoAdicionar = card.querySelector(".btn-adicionar");

        let valorQuantidade = 1;

        // Os controles respeitam o mínimo de 1 e o máximo compartilhado de 99.
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

// O evento input atualiza os resultados a cada edição do campo.
campoBusca.addEventListener("input", () => {
    termoBusca = campoBusca.value;
    renderizarProdutos();
});

// Um clique troca a categoria e preserva o termo digitado.
filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
        filtros.forEach((botao) => {
            botao.classList.remove("ativo");
        });

        filtro.classList.add("ativo");
        filtros.forEach((botao) => botao.setAttribute("aria-pressed", String(botao === filtro)));

        categoriaAtual = filtro.dataset.categoria;

        renderizarProdutos();
    });
});

// Renderiza o catálogo completo e informa o estado inicial dos filtros.
filtros.forEach((botao) => botao.setAttribute("aria-pressed", String(botao.classList.contains("ativo"))));
renderizarProdutos();
