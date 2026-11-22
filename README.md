# Açoriana Conveniência

Site institucional e catálogo demonstrativo da Padaria Açoriana, desenvolvido como projeto acadêmico da disciplina de Web Design com HTML5, CSS3 e JavaScript.

- **Site publicado:** https://padariaacoriana.vercel.app/
- **Código-fonte:** https://github.com/Mauogs/acoriana-site
- **Quadro de tarefas:** https://trello.com/b/waoyoNKv/web

## Objetivo

Apresentar a padaria, permitir a consulta de produtos e organizar uma seleção no carrinho. O botão **Finalizar pedido pelo WhatsApp** prepara uma mensagem com produtos, quantidades, valores e total, e redireciona o navegador ao WhatsApp.
O envio da mensagem e a confirmação da encomenda dependem do próprio usuário e do atendimento externo; não há pedido registrado automaticamente, pagamento, estoque ou banco de dados.
**Atenção:** este é um protótipo acadêmico; preços, imagens e telefones são demonstrativos e devem ser confirmados antes de qualquer uso comercial.

## Tecnologias

- HTML5 para a estrutura semântica das páginas.
- CSS3 para cores, tipografia, layout e adaptação às telas.
- JavaScript externo para eventos, DOM, filtros e cálculos.
- localStorage para persistir o carrinho no navegador.
- Git para versionamento.
- GitHub para armazenamento do código, branches e revisão por pull requests.
- Trello para acompanhamento visual das atividades do grupo.
- Vercel para hospedagem e publicação da branch principal.
- Playwright com Chromium para os testes de interação registrados em outubro de 2026.
- Font Awesome externo para os ícones das páginas.

## Estrutura do projeto

```text
acoriana-site/
├── index.html                  # Página inicial
├── catalogo.html               # Busca, filtros e listagem
├── produto.html                # Detalhes de um produto
├── carrinho.html               # Itens, totais e WhatsApp
├── sobre.html                  # Página institucional
├── README.md
├── css/
│   ├── style.css
│   ├── responsivo.css
│   ├── catalogo.css
│   ├── produto.css
│   ├── carrinho.css
│   ├── sobre.css
│   ├── rodape.css
│   └── pagina-contato.css
├── js/
│   ├── script.js               # Carrinho, menu e WhatsApp
│   ├── produtos.js             # Dados demonstrativos
│   ├── catalogo.js             # Busca, filtros e catálogo
│   ├── produto.js              # Detalhamento do produto
│   └── rodape.js
├── docs/
│   └── verificacao-atividade.md
└── assets/                     # Imagens, ícones e logotipos
```

## Como executar

1. Clone o repositório `https://github.com/Mauogs/acoriana-site.git`.
2. Abra a pasta no Visual Studio Code.
3. Utilize a extensão Live Server ou um servidor HTTP local.
4. Como alternativa, execute `python -m http.server 8000` na pasta do projeto.
5. Acesse `http://localhost:8000` no navegador.
6. Navegue entre início, catálogo e carrinho usando a mesma origem.

Não há etapa de compilação nem necessidade de instalar dependências para usar o site.
O servidor HTTP evita diferenças do armazenamento ao abrir páginas diretamente com `file://`.

## JavaScript externo

As páginas carregam scripts externos. A página inicial utiliza `script.js`, e o catálogo carrega `produtos.js`, `script.js` e `catalogo.js` nessa ordem. A página `produto.html` usa `produtos.js` e `produto.js` para localizar o item pelo parâmetro `id` da URL.
O carrinho carrega `script.js` ao final do `body`. A ordem dos scripts disponibiliza os dados e as funções necessários antes da execução dos recursos interativos. O rodapé tem comportamentos adicionais em `rodape.js`.

## Funcionalidades implementadas

### 1. Ano do rodapé

`inicializarPagina` usa `Date` para atualizar o ano automaticamente.
O elemento só é atualizado nas páginas em que existe.

### 2. Busca de produtos

O evento `input` acompanha o texto digitado no campo de pesquisa.
A busca considera nome e descrição, sem diferenciar maiúsculas de minúsculas.
O resultado é combinado com a categoria atualmente selecionada.

### 3. Filtro por categoria

Os botões selecionam pães, doces, salgados, bolos e outras categorias.
A classe `ativo` identifica o filtro aplicado.
O atributo `aria-pressed` comunica esse estado aos leitores de tela.

### 4. Quantidade no catálogo

Os botões de mais e menos permitem escolher quantas unidades adicionar.
A seleção fica entre 1 e 99 unidades por produto.

### 5. Adição ao carrinho

`adicionarAoCarrinho` inclui produtos do catálogo e dos quatro destaques da página inicial.
Produtos com o mesmo nome têm suas quantidades somadas até o limite de 99.
Um aviso visual com `role="status"` confirma a ação.

### 6. Persistência local

`salvarCarrinho` grava a seleção em JSON na chave `carrinho` do localStorage.
`carregarCarrinho` recupera e valida os dados ao abrir outra página.
JSON danificado ou armazenamento bloqueado não interrompem a navegação.
Se não for possível salvar, o usuário recebe um aviso e mantém o estado nesta página.

### 7. Contador de unidades

`atualizarContador` soma as quantidades de todos os itens.
O cabeçalho mostra unidades, e não apenas o número de produtos diferentes.

### 8. Alteração da quantidade no carrinho

`alterarQuantidade` aplica os mesmos limites do catálogo.
Subtotal, total e contador são atualizados após cada alteração.
O botão permanece no DOM para preservar o foco durante o uso do teclado.

### 9. Remoção de itens

`removerDoCarrinho` exclui o produto escolhido.
Quando o último produto é removido, surge o estado vazio com acesso ao catálogo.

### 10. Cálculo dos valores

`calcularTotal` soma os valores em centavos.
`formatarPreco` utiliza `Intl.NumberFormat` para exibir reais no padrão brasileiro.
O protótipo não inclui frete, descontos, cobrança ou validação de preços em servidor.

### 11. Encomenda pelo WhatsApp

`gerarMensagemPedido` monta uma mensagem com os produtos selecionados, quantidades, preços unitários, subtotais e total.
No clique em **Finalizar pedido pelo WhatsApp**, `configurarResumoPedido` verifica se o carrinho tem itens e gera uma URL `https://wa.me/...` com o texto codificado por `encodeURIComponent`.
A navegação usa `window.location.assign(url)`, e não `window.open`, para evitar dependência de abertura de uma nova aba.
**O site apenas prepara a mensagem e abre o WhatsApp.** O usuário precisa confirmar o envio; não há cobrança, processamento de pagamento ou confirmação automática da encomenda.

### 12. Menu móvel

`configurarMenu` alterna a navegação em telas de até 900 pixels.
O botão atualiza `aria-expanded` e identifica o menu com `aria-controls`.
Escape fecha o menu e devolve o foco ao botão.
Sem JavaScript, os links continuam disponíveis.

### 13. Sincronização entre abas

O evento `storage` atualiza o contador e a lista quando outra aba altera o carrinho.
A sincronização depende de as abas estarem na mesma origem do navegador.

### 14. Mensagem de resultado da busca

A pesquisa informa a quantidade de produtos encontrados.
Quando não há correspondência, orienta a tentar outro termo ou categoria.
A região possui anúncio acessível para tecnologias assistivas.

## Comentários e organização

O HTML contém comentários sobre metadados, navegação, conteúdo, cartões e scripts.
O CSS explica os componentes, seus seletores e as adaptações responsivas.
O JavaScript documenta funções, estado, eventos, validações e efeitos no DOM.
Os antigos `main.js` e `carrinho.js` foram reunidos em `script.js`, evitando execução duplicada.
Os estilos antes presentes em `home.css` foram incorporados a `style.css`.
Os seletores da página inicial têm escopo próprio para preservar as demais páginas.

## Requisitos da atividade

- `index.html`: mais de 500 linhas.
- `css/style.css`: mais de 400 linhas.
- `js/script.js`: mais de 300 linhas.
- `README.md`: pelo menos 100 linhas.
- Mais de cinco funcionalidades JavaScript identificadas neste documento.
- Inclusão externa de JavaScript por meio de `script src`.
- Código HTML, CSS e JavaScript comentado por blocos e responsabilidades.
- Código versionado e publicado no GitHub.

A contagem pode ser conferida com `wc -l index.html css/style.css js/script.js README.md`.
No PowerShell, use `(Get-Content caminho-do-arquivo).Count` para cada arquivo.

## Verificação manual

1. Na página inicial, adicione um produto e confira o contador.
2. Abra o catálogo, pesquise `Brownie` e confira o resultado.
3. Selecione outra categoria e observe a combinação com a busca.
4. Apague a busca e retorne ao filtro Todos.
5. Altere uma quantidade e adicione o produto.
6. No carrinho, aumente, diminua e remova itens.
7. Recarregue a página e confira a persistência.
8. Com itens no carrinho, clique em **Finalizar pedido pelo WhatsApp** e confira a abertura do WhatsApp com os produtos e o total preenchidos. Não envie a mensagem durante o teste.
9. Em tela móvel, abra o menu e navegue pelos links.
10. Abra outra aba na mesma origem para conferir a sincronização.

## Versionamento, gestão e publicação

- A branch `main` representa a versão principal do código. Novas funcionalidades e correções são trabalhadas em branches e revisadas em pull requests.
- Mensagens de commit utilizam prefixos descritivos como `feat:`, `fix:` e `docs:`.
- O Trello auxilia na organização visual das tarefas: https://trello.com/b/waoyoNKv/web
- A Vercel está conectada ao repositório e publica a versão de produção em https://padariaacoriana.vercel.app/.
- Em **21/11/2026**, o pull request [#13](https://github.com/Mauogs/acoriana-site/pull/13) integrou à `main` a alteração que substituiu a abertura de uma nova aba pelo redirecionamento direto ao WhatsApp. A Vercel registrou esse deploy de produção como `READY`.

## Evidências e alcance dos testes

O arquivo [docs/verificacao-atividade.md](docs/verificacao-atividade.md) documenta testes com Playwright e Chromium realizados em **16/10/2026**, em uma revisão anterior do código.
Entre os cenários registrados estão busca e filtros, carrinho, persistência, sincronização entre abas e navegação móvel. A referência histórica a um **resumo modal** nesse arquivo pertence à versão testada naquela data; a versão atual usa **redirecionamento direto ao WhatsApp**.
Esses resultados históricos **não comprovam, por si só, testes automatizados do botão após a alteração de 21/11/2026**. O procedimento manual correspondente está descrito acima.

## Limitações do protótipo

Parte das imagens do catálogo utiliza URLs externas e depende de conectividade. Os produtos e preços são dados demonstrativos.
O carrinho é salvo no navegador; os dados podem ser apagados ou alterados pelo próprio usuário e não constituem uma base comercial.
Os links de contato presentes nas páginas devem ser conferidos pelo grupo antes de divulgação pública, pois podem representar dados demonstrativos. O WhatsApp só recebe a mensagem se o usuário decidir enviá-la.
Não há autenticação, gerenciamento de estoque, cálculo de entrega, cobrança, pagamento ou backend.
A verificação final em dispositivos reais e a confirmação dos requisitos específicos apresentados em aula são responsabilidades do grupo.

## Autoria

Projeto acadêmico do grupo identificado no relatório da atividade.
Repositório: https://github.com/Mauogs/acoriana-site
