let totalGeral = 0;
let itensCarrinho = {}; // ← Objeto para acumular os produtos
limpar();

function adicionar () {
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split('-')[0].trim();
    let valorUnitario = parseFloat(produto.split('R$')[1]);
    let quantidade = parseInt(document.getElementById('quantidade').value);

    // Validações
    if (!produto || produto.trim() === "") {
        alert("Selecione um produto válido.");
        return;
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Insira uma quantidade válida.");
        return;
    }

    // Se já existe no carrinho, somar quantidade e valor
    if (itensCarrinho[nomeProduto]) {
        itensCarrinho[nomeProduto].quantidade += quantidade;
        itensCarrinho[nomeProduto].subtotal += quantidade * valorUnitario;
    } else {
        itensCarrinho[nomeProduto] = {
            quantidade: quantidade,
            valorUnitario: valorUnitario,
            subtotal: quantidade * valorUnitario
        };
    }

    // Atualizar total geral
    totalGeral += quantidade * valorUnitario;

    // Atualizar visual do carrinho
    atualizarCarrinho();

    // Resetar campo quantidade
    document.getElementById('quantidade').value = 0;
}

function atualizarCarrinho() {
    let carrinho = document.getElementById('lista-produtos');
    carrinho.innerHTML = '';

    for (let produto in itensCarrinho) {
        let item = itensCarrinho[produto];
        carrinho.innerHTML += `
        <section class="carrinho__produtos__produto">
            <span class="texto-azul">${item.quantidade}x</span> ${produto} 
            <span class="texto-azul">R$${item.subtotal.toFixed(2)}</span>
        </section>`;
    }

    let campoTotal = document.getElementById('valor-total');
    campoTotal.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

function limpar () {
    totalGeral = 0;
    itensCarrinho = {}; // ← Limpa o controle de produtos
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0.00';
}
