const produtos = [
    {
        nome: "Pão Francês",
        categoria: "Pães",
        descricao: "Pão francês tradicional, crocante por fora e macio por dentro.",
        preco: 1.20,
        imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
    },
    {
        nome: "Pão de Queijo",
        categoria: "Pães",
        descricao: "Pão de queijo macio e saboroso, preparado com ingredientes selecionados.",
        preco: 3.50,
        imagem: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
    },
    {
        nome: "Pão Integral",
        categoria: "Pães",
        descricao: "Pão integral preparado para uma opção saborosa e equilibrada.",
        preco: 14.90,
        imagem: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80"
    },
    {
        nome: "Rosca de Coco",
        categoria: "Pães",
        descricao: "Rosca macia com sabor delicado de coco, perfeita para acompanhar o café.",
        preco: 18.90,
        imagem: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80"
    },
    {
        nome: "Croissant",
        categoria: "Pães Especiais",
        descricao: "Croissant leve e folhado, preparado com massa delicada e crocante.",
        preco: 9.90,
        imagem: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80"
    },
    {
        nome: "Pão de Fermentação Natural",
        categoria: "Pães Especiais",
        descricao: "Pão artesanal preparado com fermentação natural e ingredientes selecionados.",
        preco: 24.90,
        imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
    },
    {
        nome: "Crostinha de Queijos",
        categoria: "Pães Especiais",
        descricao: "Preparação especial com uma combinação saborosa de queijos.",
        preco: 12.90,
        imagem: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80"
    },
    {
        nome: "Sonho",
        categoria: "Doces",
        descricao: "Massa macia e delicada, preparada para deixar o café ainda mais especial.",
        preco: 8.90,
        imagem: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80"
    },
    {
        nome: "Queijada",
        categoria: "Doces",
        descricao: "Doce tradicional de textura macia e sabor marcante.",
        preco: 7.90,
        imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
    },
    {
        nome: "Churros",
        categoria: "Doces",
        descricao: "Churros crocantes por fora e macios por dentro, perfeitos para qualquer momento.",
        preco: 8.50,
        imagem: "https://images.unsplash.com/photo-1624371414361-e670edf4898a?w=800&q=80"
    },
    {
        nome: "Brownie",
        categoria: "Doces",
        descricao: "Brownie de chocolate com textura macia e sabor intenso.",
        preco: 11.90,
        imagem: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80"
    },
    {
        nome: "Petit Gâteau",
        categoria: "Doces",
        descricao: "Sobremesa de chocolate com textura delicada e sabor marcante.",
        preco: 19.90,
        imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80"
    },
    {
        nome: "Bolo de Chocolate",
        categoria: "Bolos",
        descricao: "Bolo de chocolate macio e saboroso, perfeito para acompanhar um café.",
        preco: 59.90,
        imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
    },
    {
        nome: "Bolos Diversos",
        categoria: "Bolos",
        descricao: "Variedade de bolos preparados com receitas especiais da Açoriana.",
        preco: 54.90,
        imagem: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80"
    },
    {
        nome: "Coxinha",
        categoria: "Salgados",
        descricao: "Coxinha crocante por fora e recheada com um saboroso preparo de frango.",
        preco: 9.90,
        imagem: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80"
    },
    {
        nome: "Torta de Frango",
        categoria: "Salgados",
        descricao: "Torta preparada com recheio saboroso de frango e massa delicada.",
        preco: 12.90,
        imagem: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
    },
    {
        nome: "Bolinho de Bacalhau",
        categoria: "Salgados",
        descricao: "Receita tradicional trazida dos Açores, preparada com bacalhau e ingredientes selecionados.",
        preco: 12.90,
        imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80"
    },
    {
        nome: "Patês",
        categoria: "Salgados",
        descricao: "Patês preparados para acompanhar pães, torradas e outras opções da casa.",
        preco: 16.90,
        imagem: "https://images.unsplash.com/photo-1621939514649-280e2aa0c6b5?w=800&q=80"
    },
    {
        nome: "Sopa Açoriana",
        categoria: "Pratos Especiais",
        descricao: "Especialidade da casa inspirada nas raízes açorianas e preparada com o segredinho dos Açores.",
        preco: 24.90,
        imagem: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80"
    },
    {
        nome: "Creme de Abóbora com Carne Seca",
        categoria: "Pratos Especiais",
        descricao: "Creme de abóbora preparado com carne seca, ideal para os dias mais frios.",
        preco: 26.90,
        imagem: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80"
    }
];