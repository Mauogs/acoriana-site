# Açoriana Conveniência

Site institucional e catálogo demonstrativo da Padaria Açoriana.
Projeto acadêmico da disciplina de Web Design, desenvolvido com HTML, CSS e JavaScript.
A identidade visual e as páginas existentes foram preservadas nesta adequação.

## Objetivo

Apresentar a padaria, permitir a consulta de produtos e organizar uma seleção no carrinho.
O site é um protótipo: preços, imagens e contatos devem ser confirmados antes de uso comercial.
Não existe cobrança, pagamento, envio de encomenda ou integração com banco de dados.

## Tecnologias

- HTML5 para a estrutura semântica das páginas.
- CSS3 para cores, tipografia, layout e adaptação às telas.
- JavaScript externo para eventos, DOM, filtros e cálculos.
- localStorage para persistir o carrinho no navegador.
- Git para versionamento.
- GitHub para publicação do código e revisão por pull request.
- Font Awesome externo para os ícones da página inicial.

## Estrutura do projeto

```text
acoriana-site/
├── index.html
├── catalogo.html
├── carrinho.html
├── README.md
├── css/
│   ├── style.css
│   ├── catalogo.css
│   ├── carrinho.css
│   └── responsivo.css
├── js/
│   ├── script.js
│   ├── produtos.js
│   └── catalogo.js
└── assets/
    ├── banners/
    ├── icones/
    ├── logo/
    └── produtos/
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

A página inicial importa `js/script.js` por meio da tag `<script src="js/script.js"></script>`.
O catálogo carrega `produtos.js`, `script.js` e `catalogo.js`, nessa ordem.
O carrinho carrega `script.js` ao final do corpo da página.
A ordem torna os dados e as funções compartilhadas disponíveis antes de renderizar o catálogo.
Não são utilizados eventos JavaScript inline nos elementos HTML.

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

### 11. Resumo da encomenda

O botão do carrinho abre um `dialog` com produtos, quantidades e total demonstrativo.
O fechamento funciona pelo botão ou pela tecla Escape.
A janela informa expressamente que o resumo não envia pedidos nem recebe pagamentos.

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
8. Abra o resumo e feche com Escape.
9. Em tela móvel, abra o menu e navegue pelos links.
10. Abra outra aba na mesma origem para conferir a sincronização.

## Versionamento e colaboração

O repositório já possuía histórico Git e publicação no GitHub antes desta adequação.
As mudanças seguem o padrão existente de mensagens com prefixos `feat:`, `fix:` e `docs:`.
A branch desta adequação é `feat/adequar-atividade-javascript`.
A revisão das mudanças deve ser feita pelo pull request antes da integração à `main`.
O relatório distingue operações realizadas no ambiente de validação de etapas feitas no VS Code.

## Limitações do protótipo

As imagens do catálogo usam URLs externas e dependem de conectividade.
O carrinho pertence apenas ao navegador e pode ser apagado nas configurações de privacidade.
O armazenamento local pode ser alterado pelo próprio usuário e não representa uma base comercial.
Os contatos e preços existentes são demonstrativos e precisam de revisão para publicação comercial.
Não há autenticação, estoque, entrega, pagamento ou backend.
Os exemplos exatos apresentados em aula devem ser confirmados pelos integrantes antes da entrega.

## Autoria

Projeto acadêmico do grupo identificado no relatório da atividade.
Repositório: https://github.com/Mauogs/acoriana-site
