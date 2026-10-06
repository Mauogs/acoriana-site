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

                    <button class="btn-adicionar">
                        Adicionar
                    </button>
                </div>
            </div>
        `;

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