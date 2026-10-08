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

atualizarContador();