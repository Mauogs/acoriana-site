"use strict";

const parametrosURL = new URLSearchParams(window.location.search);
const idProduto = parametrosURL.get("id");

const produtoSelecionado = produtos.find((produto) => produto.id === idProduto);

const imagemProduto = document.querySelector("#imagem-produto");
const categoriaProduto = document.querySelector("#categoria-produto");
const nomeProduto = document.querySelector("#nome-produto");
const descricaoProduto = document.querySelector("#descricao-produto");
const precoProduto = document.querySelector("#preco-produto");
const breadcrumbProduto = document.querySelector("#breadcrumb-produto");
const avisoProduto = document.querySelector("#aviso-produto");
const botaoAdicionar = document.querySelector("#adicionar-produto");

function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function configurarImagem(imagem, produto) {
    imagem.alt = produto.nome;
    imagem.src = produto.imagem;

    imagem.onerror = () => {
        const imagemFallback = "assets/logo/logo_padaria_acoriana.png";

        if (!imagem.src.endsWith(imagemFallback)) {
            imagem.src = imagemFallback;
        } else {
            imagem.onerror = null;
        }
    };
}

function exibirProduto(produto) {
    configurarImagem(imagemProduto, produto);

    categoriaProduto.textContent = produto.categoria;
    nomeProduto.textContent = produto.nome;
    descricaoProduto.textContent = produto.descricao;
    precoProduto.textContent = formatarPreco(produto.preco);
    breadcrumbProduto.textContent = produto.nome;

    document.title = `${produto.nome} | Açoriana Conveniência`;

    avisoProduto.textContent = "";
}

function exibirProdutoNaoEncontrado() {
    categoriaProduto.textContent = "Produto indisponível";
    nomeProduto.textContent = "Produto não encontrado";
    descricaoProduto.textContent =
        "Não foi possível encontrar esse produto. Volte ao catálogo para conferir as opções disponíveis.";
    precoProduto.textContent = "";

    breadcrumbProduto.textContent = "Produto não encontrado";

    imagemProduto.src = "assets/produtos/nao-encontrado.png";
    imagemProduto.alt = "Imagem indisponível";

    imagemProduto.onerror = () => {
        imagemProduto.onerror = null;
    };

    avisoProduto.textContent = "Confira os produtos disponíveis no catálogo.";

    botaoAdicionar.disabled = true;
    botaoAdicionar.setAttribute("aria-disabled", "true");

    document.title = "Produto não encontrado | Açoriana Conveniência";
}

if (produtoSelecionado) {
    exibirProduto(produtoSelecionado);
} else {
    exibirProdutoNaoEncontrado();
}