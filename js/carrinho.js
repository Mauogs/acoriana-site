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

function atualizarResumo() {
    const subtotal = carrinho.reduce(
        (total, produto) => total + produto.preco * produto.quantidade,
        0
    );

    const valoresResumo = document.querySelectorAll(".resumo-linha strong");

    if (valoresResumo.length >= 2) {
        valoresResumo[0].textContent = formatarPreco(subtotal);
        valoresResumo[1].textContent = formatarPreco(subtotal);
    }
}

function removerDoCarrinho(nomeProduto) {
    carrinho = carrinho.filter(
        (produto) => produto.nome !== nomeProduto
    );

    salvarCarrinho();
    atualizarContador();
    renderizarCarrinho();
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

        const quantidade = item.querySelector(".quantidade");
        const subtotal = item.querySelector(".item-subtotal");
        const diminuir = item.querySelector(".diminuir");
        const aumentar = item.querySelector(".aumentar");
        const remover = item.querySelector(".btn-remover");

        diminuir.addEventListener("click", () => {
            if (produto.quantidade > 1) {
                produto.quantidade--;

                quantidade.textContent = produto.quantidade;
                subtotal.textContent = formatarPreco(
                    produto.preco * produto.quantidade
                );

                salvarCarrinho();
                atualizarContador();
                atualizarResumo();
            }
        });

        aumentar.addEventListener("click", () => {
            produto.quantidade++;

            quantidade.textContent = produto.quantidade;
            subtotal.textContent = formatarPreco(
                produto.preco * produto.quantidade
            );

            salvarCarrinho();
            atualizarContador();
            atualizarResumo();
        });

        remover.addEventListener("click", () => {
            removerDoCarrinho(produto.nome);
        });

        listaCarrinho.appendChild(item);
    });

    atualizarResumo();
}

atualizarContador();
renderizarCarrinho();