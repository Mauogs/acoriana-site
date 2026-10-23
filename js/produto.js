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
const botaoDiminuir = document.querySelector("#diminuir-quantidade");
const botaoAumentar = document.querySelector("#aumentar-quantidade");
const campoQuantidade = document.querySelector("#quantidade-produto");

const QUANTIDADE_MAXIMA_PRODUTO = 99;
let quantidadeAtual = 1;

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
        imagem.onerror = null;
        imagem.src = "assets/produtos/nao-encontrado.png";
    };
}

function atualizarQuantidade() {
    campoQuantidade.value = quantidadeAtual;
    campoQuantidade.textContent = quantidadeAtual;

    botaoDiminuir.disabled = quantidadeAtual <= 1;
    botaoAumentar.disabled = quantidadeAtual >= QUANTIDADE_MAXIMA_PRODUTO;
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

    atualizarQuantidade();
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

    botaoDiminuir.disabled = true;
    botaoAumentar.disabled = true;
    campoQuantidade.disabled = true;

    document.title = "Produto não encontrado | Açoriana Conveniência";
}

if (produtoSelecionado) {
    exibirProduto(produtoSelecionado);

    botaoDiminuir.addEventListener("click", () => {
        if (quantidadeAtual > 1) {
            quantidadeAtual--;
            atualizarQuantidade();
        }
    });

    botaoAumentar.addEventListener("click", () => {
        if (quantidadeAtual < QUANTIDADE_MAXIMA_PRODUTO) {
            quantidadeAtual++;
            atualizarQuantidade();
        }
    });

    botaoAdicionar.addEventListener("click", () => {
        adicionarAoCarrinho(produtoSelecionado, quantidadeAtual);

        avisoProduto.textContent =
            `${quantidadeAtual} unidade(s) de ${produtoSelecionado.nome} adicionada(s) ao carrinho.`;
    });
} else {
    exibirProdutoNaoEncontrado();
}