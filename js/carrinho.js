const CHAVE_CARRINHO = "carrinho";

let carrinho = JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];

function salvarCarrinho() {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

function atualizarContador() {
    const contador = document.querySelector(".contador");

    if (!contador) {
        return;
    }

    const total = carrinho.reduce(
        (soma, produto) => soma + produto.quantidade,
        0
    );

    contador.textContent = total;
}

function adicionarAoCarrinho(produto, quantidade) {
    const produtoExistente = carrinho.find(
        (item) => item.nome === produto.nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            ...produto,
            quantidade
        });
    }

    salvarCarrinho();
    atualizarContador();
}

function formatarPreco(preco) {
    return `R$ ${preco.toFixed(2).replace(".", ",")}`;
}

function renderizarCarrinho() {
    const listaCarrinho = document.querySelector(".lista-carrinho");

    if (!listaCarrinho) {
        return;
    }

    listaCarrinho.innerHTML = "";

    carrinho.forEach((produto) => {
        const item = document.createElement("div");
        item.classList.add("item-carrinho");

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="item-info">
                <span class="item-categoria">${produto.categoria}</span>
                <h3>${produto.nome}</h3>
                <span class="item-preco">${formatarPreco(produto.preco)}</span>
            </div>

            <div class="item-controle">
                <button class="btn-quantidade diminuir">-</button>
                <span class="quantidade">${produto.quantidade}</span>
                <button class="btn-quantidade aumentar">+</button>
            </div>

            <strong class="item-subtotal">
                ${formatarPreco(produto.preco * produto.quantidade)}
            </strong>

            <button class="btn-remover">
                Remover
            </button>
        `;

        listaCarrinho.appendChild(item);
    });
}

atualizarContador();
renderizarCarrinho();