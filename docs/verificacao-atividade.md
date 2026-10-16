# Verificação da atividade de JavaScript

Data: 16/10/2026. Base auditada: `804cb7e`.

## Contagens verificadas

| Arquivo | Linhas | Exigência |
| --- | ---: | --- |
| `index.html` | 570 | mais de 500 |
| `css/style.css` | 1735 | mais de 400 |
| `js/script.js` | 357 | mais de 300 |
| `README.md` | 206 | pelo menos 100 |

As contagens incluem comentários e linhas em branco, seguindo a contagem física de linhas do arquivo.
Os estilos preexistentes da home foram consolidados, sem criar conteúdo repetido para atingir o mínimo.

## Funcionalidades e testes

Testes de interação executados em Chromium 131.0.6778.204, com Playwright em servidor HTTP local.

| Cenário | Resultado |
| --- | --- |
| Página inicial e scripts carregados | Aprovado |
| Destaque adiciona ao carrinho e atualiza contador | Aprovado |
| Persistência entre páginas | Aprovado |
| Busca por nome | Aprovado |
| Combinação de busca e filtro com estado vazio | Aprovado |
| Quantidade selecionada e inclusão pelo catálogo | Aprovado |
| Totais em reais e soma das quantidades | Aprovado |
| Aumentar e diminuir atualizam totais | Aprovado |
| Persistência após recarregar | Aprovado |
| Resumo modal e fechamento com Escape | Aprovado |
| Sincronização entre abas | Aprovado |
| Remoção de todos os itens e estado vazio | Aprovado |
| Recuperação de JSON corrompido | Aprovado |
| Dados do carrinho renderizados como texto e imagem inválida rejeitada | Aprovado |
| Menu móvel, Escape e ausência de rolagem horizontal em 390/768/900/1280 px | Aprovado |
| Ausência de erros JavaScript nas páginas testadas | Aprovado |

Também foram verificados os caminhos internos, as âncoras, os IDs e a sintaxe dos três arquivos JavaScript.
Não foram observadas exceções JavaScript nos fluxos exercitados.

## Escopo da adequação

- Identidade visual e conteúdo institucional preservados.
- README ampliado com funções, execução, validação e limitações.
- `script.js` reúne código compartilhado, com documentação por responsabilidades.
- `style.css` incorpora estilos da home com escopo sem aumentar a especificidade.
- Links para páginas inexistentes corrigidos e botões dos destaques conectados ao carrinho.
- Resumo de encomenda demonstrativo e navegação móvel acessível.
- Tratamento de armazenamento inválido e renderização segura de texto do carrinho.
- Uso de imagens locais equivalentes e alternativa para imagens remotas indisponíveis.

## Limites da evidência

O histórico comprova que o projeto já estava inicializado e publicado no GitHub.
As operações desta adequação foram realizadas por Git e pela integração com GitHub; não são evidência de execução no VS Code.
Para a etapa que exige VS Code, abra o projeto no editor, atualize a branch e confira o painel Controle do Código-Fonte.
Os exemplos exatos apresentados em aula não foram fornecidos; a equivalência deve ser confirmada pelo grupo.
A publicação desta revisão acontece na branch e no pull request, sem alterar a branch principal.
O envio do relatório ao CANVAS fica sob responsabilidade dos integrantes.
