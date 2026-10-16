/*
 * Comportamentos compartilhados da Açoriana.
 * Este arquivo externo cuida do carrinho, dos destaques, do menu e do resumo.
 * Não envia pedidos nem dados para servidores: trata-se de um protótipo acadêmico.
 */
"use strict";

// Chave já utilizada na versão anterior, preservando carrinhos existentes.
const CHAVE_CARRINHO = "carrinho";
// O limite evita quantidades acidentais muito grandes em todos os controles.
const QUANTIDADE_MAXIMA = 99;
// Intl aplica a convenção brasileira de moeda sem substituir caracteres à mão.
const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

/** Converte um valor monetário numérico em texto para exibição. */
function formatarPreco(preco) {
    return moeda.format(preco);
}

/** Só permite caminhos locais e URLs HTTPS para imagens armazenadas. */
function imagemSegura(imagem) {
    if (typeof imagem !== "string") {
        return "assets/logo/logo_padaria_acoriana.png";
    }
    if (/^assets\/[a-zA-Z0-9_./-]+$/.test(imagem)) {
        return imagem;
    }
    try {
        const url = new URL(imagem);
        if (url.protocol === "https:") {
            return url.href;
        }
    } catch {
        // Um caminho inválido recebe a logomarca local como alternativa.
    }
    return "assets/logo/logo_padaria_acoriana.png";
}

/** Lê e valida o armazenamento; um JSON danificado não interrompe a página. */
function carregarCarrinho() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || "[]");
        if (!Array.isArray(dados)) {
            return [];
        }
        return dados.filter((item) => {
            return item && typeof item.nome === "string" &&
                item.nome.trim().length > 0 &&
                Number.isFinite(item.preco) && item.preco >= 0 &&
                Number.isInteger(item.quantidade) && item.quantidade > 0;
        }).map((item) => ({
            nome: item.nome.slice(0, 120),
            categoria: typeof item.categoria === "string" ? item.categoria : "Destaques",
            preco: item.preco,
            quantidade: Math.min(item.quantidade, QUANTIDADE_MAXIMA),
            imagem: imagemSegura(item.imagem)
        }));
    } catch {
        // Navegadores com armazenamento bloqueado também podem usar a sessão.
        return [];
    }
}

// O estado em memória é a fonte dos cálculos e das renderizações nesta aba.
let carrinho = carregarCarrinho();
let temporizadorAviso;

/** Mostra retorno visual e acessível sem utilizar alertas que bloqueiam a navegação. */
function avisar(mensagem) {
    let aviso = document.querySelector("#aviso-carrinho");
    if (!aviso) {
        aviso = document.createElement("p");
        aviso.id = "aviso-carrinho";
        aviso.className = "aviso-carrinho";
        aviso.setAttribute("role", "status");
        aviso.setAttribute("aria-live", "polite");
        document.body.appendChild(aviso);
    }
    clearTimeout(temporizadorAviso);
    aviso.textContent = mensagem;
    aviso.hidden = false;
    temporizadorAviso = setTimeout(() => {
        aviso.hidden = true;
    }, 4000);
}

/** Persiste o estado; se o navegador bloquear a gravação, mantém a sessão utilizável. */
function salvarCarrinho() {
    try {
        localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        return true;
    } catch {
        avisar("Carrinho atualizado nesta página. O navegador não permitiu salvar.");
        return false;
    }
}

/** Soma unidades, incluindo a quantidade de cada produto, para o cabeçalho. */
function atualizarContador() {
    const total = carrinho.reduce((soma, produto) => soma + produto.quantidade, 0);
    document.querySelectorAll(".contador").forEach((contador) => {
        contador.textContent = total;
        contador.setAttribute("aria-label", `${total} itens no carrinho`);
    });
}

/** Calcula em centavos para reduzir erros de ponto flutuante na soma. */
function calcularTotal() {
    const centavos = carrinho.reduce((total, produto) => {
        return total + Math.round(produto.preco * 100) * produto.quantidade;
    }, 0);
    return centavos / 100;
}

/** Atualiza subtotal e total: o protótipo não cobra frete nem processa pagamento. */
function atualizarResumo() {
    document.querySelectorAll(".resumo-linha strong").forEach((valor) => {
        valor.textContent = formatarPreco(calcularTotal());
    });
}

/** Unifica itens pelo nome, validando a quantidade recebida dos botões. */
function adicionarAoCarrinho(produto, quantidade) {
    const unidades = Number(quantidade);
    if (!Number.isInteger(unidades) || unidades < 1 || unidades > QUANTIDADE_MAXIMA) {
        avisar("Escolha uma quantidade entre 1 e 99.");
        return;
    }
    const existente = carrinho.find((item) => item.nome === produto.nome);
    if (existente) {
        existente.quantidade = Math.min(QUANTIDADE_MAXIMA, existente.quantidade + unidades);
    } else {
        carrinho.push({
            nome: produto.nome,
            categoria: produto.categoria || "Destaques",
            preco: produto.preco,
            imagem: imagemSegura(produto.imagem),
            quantidade: unidades
        });
    }
    const salvo = salvarCarrinho();
    atualizarContador();
    renderizarCarrinho();
    if (salvo) {
        avisar(`${produto.nome} adicionado ao carrinho (máximo de 99 por item).`);
    }
}

/** Remove o produto selecionado e recalcula todas as partes dependentes. */
function removerDoCarrinho(nomeProduto) {
    carrinho = carrinho.filter((produto) => produto.nome !== nomeProduto);
    salvarCarrinho();
    atualizarContador();
    renderizarCarrinho();
    avisar("Produto removido do carrinho.");
}

/** Centraliza limites e atualização dos controles de quantidade do carrinho. */
function alterarQuantidade(produto, variacao) {
    const proxima = produto.quantidade + variacao;
    if (proxima < 1 || proxima > QUANTIDADE_MAXIMA) {
        avisar("A quantidade deve ficar entre 1 e 99. Para excluir, use Remover.");
        return;
    }
    produto.quantidade = proxima;
    salvarCarrinho();
    atualizarContador();
    // Atualiza os valores sem recriar o botão focado, preservando uso por teclado.
    const item = Array.from(document.querySelectorAll(".item-carrinho"))
        .find((elemento) => elemento.dataset.nome === produto.nome);
    if (item) {
        item.querySelector(".quantidade").textContent = proxima;
        item.querySelector(".item-subtotal").textContent = formatarPreco(produto.preco * proxima);
    }
    atualizarResumo();
}

/** Cria os elementos com textContent; textos do localStorage não viram HTML. */
function criarItemCarrinho(produto) {
    const item = document.createElement("article");
    item.className = "item-carrinho";
    item.dataset.nome = produto.nome;
    // A marcação abaixo é fixa: somente os campos de texto recebem dados depois.
    item.innerHTML = `
        <img alt="">
        <div class="item-info">
            <span class="item-categoria"></span>
            <h3></h3>
            <span class="item-preco"></span>
        </div>
        <div class="item-controle">
            <button type="button" class="btn-quantidade diminuir">-</button>
            <span class="quantidade" aria-live="polite"></span>
            <button type="button" class="btn-quantidade aumentar">+</button>
        </div>
        <strong class="item-subtotal"></strong>
        <button type="button" class="btn-remover">Remover</button>
    `;
    const imagem = item.querySelector("img");
    imagem.src = imagemSegura(produto.imagem);
    imagem.alt = produto.nome;
    imagem.loading = "lazy";
    // Uma falha de rede troca apenas a miniatura por um recurso local conhecido.
    imagem.addEventListener("error", () => {
        imagem.src = "assets/logo/logo_padaria_acoriana.png";
    }, { once: true });
    item.querySelector("h3").textContent = produto.nome;
    item.querySelector(".item-categoria").textContent = produto.categoria;
    item.querySelector(".item-preco").textContent = formatarPreco(produto.preco);
    item.querySelector(".quantidade").textContent = produto.quantidade;
    item.querySelector(".item-subtotal").textContent = formatarPreco(produto.preco * produto.quantidade);
    // Rótulos identificam o produto para quem utiliza leitor de tela.
    const diminuir = item.querySelector(".diminuir");
    const aumentar = item.querySelector(".aumentar");
    const remover = item.querySelector(".btn-remover");
    diminuir.setAttribute("aria-label", `Diminuir quantidade de ${produto.nome}`);
    aumentar.setAttribute("aria-label", `Aumentar quantidade de ${produto.nome}`);
    remover.setAttribute("aria-label", `Remover ${produto.nome}`);
    diminuir.addEventListener("click", () => alterarQuantidade(produto, -1));
    aumentar.addEventListener("click", () => alterarQuantidade(produto, 1));
    remover.addEventListener("click", () => removerDoCarrinho(produto.nome));
    return item;
}

/** Exibe lista ou estado vazio; pode ser chamada com segurança em qualquer página. */
function renderizarCarrinho() {
    const lista = document.querySelector(".lista-carrinho");
    if (!lista) {
        return;
    }
    const resumo = document.querySelector(".resumo-carrinho");
    const conteudo = document.querySelector(".carrinho-conteudo");
    lista.replaceChildren();
    const vazio = carrinho.length === 0;
    conteudo.classList.toggle("vazio", vazio);
    resumo.hidden = vazio;
    if (vazio) {
        // Conteúdo constante: não há interpolação de dados externos neste HTML.
        lista.innerHTML = `
            <div class="carrinho-vazio">
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione alguns produtos ao seu carrinho para continuar.</p>
                <a href="catalogo.html" class="btn-voltar-catalogo">Voltar ao Catálogo</a>
            </div>
        `;
    } else {
        carrinho.forEach((produto) => lista.appendChild(criarItemCarrinho(produto)));
    }
    atualizarResumo();
}

/** Liga os quatro botões da página inicial aos dados declarados nos cartões. */
function configurarDestaques() {
    document.querySelectorAll(".produto-card[data-nome]").forEach((card) => {
        card.querySelector(".btn-produto").addEventListener("click", () => {
            adicionarAoCarrinho({
                nome: card.dataset.nome,
                categoria: "Destaques",
                preco: Number(card.dataset.preco),
                imagem: card.dataset.imagem
            }, 1);
        });
    });
}

/** Abre um resumo local; o usuário não é levado a um pagamento inexistente. */
function configurarResumoPedido() {
    const botao = document.querySelector(".btn-finalizar");
    if (!botao) {
        return;
    }
    const dialogo = document.createElement("dialog");
    dialogo.className = "dialogo-pedido";
    dialogo.setAttribute("aria-labelledby", "titulo-resumo");
    dialogo.innerHTML = `
        <h2 id="titulo-resumo">Resumo da encomenda</h2>
        <p>Confira sua seleção. Este protótipo não envia pedidos nem recebe pagamentos.</p>
        <pre class="texto-pedido"></pre>
        <button type="button" class="fechar-resumo">Voltar ao carrinho</button>
    `;
    document.body.appendChild(dialogo);
    botao.addEventListener("click", () => {
        if (carrinho.length === 0) {
            avisar("Adicione produtos antes de conferir o resumo.");
            return;
        }
        const linhas = carrinho.map((produto) => {
            return `${produto.quantidade} x ${produto.nome}: ${formatarPreco(produto.preco * produto.quantidade)}`;
        });
        linhas.push("", `Total demonstrativo: ${formatarPreco(calcularTotal())}`);
        dialogo.querySelector(".texto-pedido").textContent = linhas.join("\n");
        dialogo.showModal();
    });
    // O dialog nativo também fecha com Escape e devolve o foco ao botão inicial.
    dialogo.querySelector(".fechar-resumo").addEventListener("click", () => dialogo.close());
}

/** Habilita a navegação móvel sem esconder o menu quando JavaScript está desligado. */
function configurarMenu() {
    const botao = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#menu-principal");
    if (!botao || !menu) {
        return;
    }
    botao.hidden = false;
    document.body.classList.add("com-javascript");
    function fecharMenu() {
        botao.setAttribute("aria-expanded", "false");
        menu.classList.remove("aberto");
    }
    botao.addEventListener("click", () => {
        const aberto = botao.getAttribute("aria-expanded") !== "true";
        botao.setAttribute("aria-expanded", String(aberto));
        menu.classList.toggle("aberto", aberto);
    });
    menu.addEventListener("click", (evento) => {
        if (evento.target.closest("a")) {
            fecharMenu();
        }
    });
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && menu.classList.contains("aberto")) {
            fecharMenu();
            botao.focus();
        }
    });
    // Evita deixar o estado móvel aberto após ampliar e reduzir a janela.
    window.matchMedia("(max-width: 900px)").addEventListener("change", fecharMenu);
}

/** Mantém ano do rodapé e carrinho coerentes ao iniciar a página. */
function inicializarPagina() {
    const anoAtual = document.querySelector("#ano-atual");
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }
    configurarMenu();
    configurarDestaques();
    configurarResumoPedido();
    atualizarContador();
    renderizarCarrinho();
}

// O evento storage é disparado nas outras abas quando o carrinho é alterado.
window.addEventListener("storage", (evento) => {
    if (evento.key === CHAVE_CARRINHO || evento.key === null) {
        carrinho = carregarCarrinho();
        atualizarContador();
        renderizarCarrinho();
    }
});

// Os scripts são carregados ao final do body: os elementos já estão disponíveis.
inicializarPagina();
