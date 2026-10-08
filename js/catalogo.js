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

    produtosFiltrados.forEach((produto) => {
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
            valorQuantidade++;
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

        categoriaAtual = filtro.dataset.categoria;

        renderizarProdutos();
    });
});

renderizarProdutos();