class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
          cafe: { descricao: "Café", valor: 3.00 },
          chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
          suco: { descricao: "Suco Natural", valor: 6.20 },
          sanduiche: { descricao: "Sanduíche", valor: 6.50 },
          queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
          salgado: { descricao: "Salgado", valor: 7.25 },
          combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
          combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
        };
      }
    
      calcularValorDaCompra(formaDePagamento, itens) {
        const descontoDinheiro = 0.05; // 5% de desconto
        const acrescimoCredito = 0.03; // 3% de acréscimo
    
        let valorTotal = 0;
        let possuiItemPrincipal = false;
    
        if (itens.length === 0) {
          return "Não há itens no carrinho de compra!";
        }
    
        for (const itemInfo of itens) {
          const [codigo, quantidade] = itemInfo.split(",");
          if (this.cardapio.hasOwnProperty(codigo)) {
            const { valor } = this.cardapio[codigo];
            const valorItem = valor * parseInt(quantidade);
    
            if (parseInt(quantidade) <= 0) {
              return "Quantidade inválida!";
            }
    
            if ((codigo === "chantily" || codigo === "queijo") && parseInt(quantidade) > 0) {
              const itemPrincipal = codigo === "chantily" ? "cafe" : "sanduiche";
              const quantidadeItemPrincipal = itens
                .map(info => info.split(","))
                .filter(info => info[0] === itemPrincipal)
                .reduce((total, info) => total + parseInt(info[1]), 0);
    
              if (quantidadeItemPrincipal < 1) {
                return "Item extra não pode ser pedido sem o principal";
              }
            }
    
            if (codigo !== "combo1" && codigo !== "combo2") {
              possuiItemPrincipal = true;
            }
    
            valorTotal += valorItem;
          } else {
            return "Item inválido!";
          }
        }
    
        if (!possuiItemPrincipal) {
          return "Não há itens no carrinho de compra!";
        }
    
        if (formaDePagamento === "dinheiro") {
          valorTotal -= valorTotal * descontoDinheiro;
        } else if (formaDePagamento === "credito") {
          valorTotal += valorTotal * acrescimoCredito;
        } else if (formaDePagamento !== "debito") {
          return "Forma de pagamento inválida!";
        }
    
        const valorFormatado = "R$ " + valorTotal.toFixed(2).replace(".", ",");
        return valorFormatado;
      }
    }
    
export { CaixaDaLanchonete };
