const listaProdutos = document.querySelector(".lista-produtos");

if (listaProdutos) {
    produtos.forEach((produto) => {
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