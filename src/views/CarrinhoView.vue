<template>
    <div class="carrinho-container">
      <h1>Seu Carrinho</h1>
  
      <div v-if="carrinho.length > 0">
        <div v-for="(item, index) in carrinho" :key="item.id" class="carrinho-item">
          <img :src="`http://127.0.0.1:8000/api/media/${item.imagem.split('/media/')[1]}`" alt="Imagem do produto" />
          <div class="detalhes">
            <h2>{{ item.nome }}</h2>
            <p>Preço: R$ {{ item.preco.toFixed(2) }}</p>
            <div class="quantidade-container">
              <button @click="alterarQuantidade(index, -1)">-</button>
              <span>{{ item.quantidade }}</span>
              <button @click="alterarQuantidade(index, 1)">+</button>
            </div>
            <button class="remover" @click="removerItem(index)">Remover</button>
          </div>
        </div>
  
        <h2 class="total">Total: R$ {{ total.toFixed(2) }}</h2>
        <button class="finalizar-compra" @click="finalizarCompra">Finalizar Compra</button>
    </div>
  
      <p v-else>Seu carrinho está vazio.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        carrinho: []
      };
    },
    computed: {
      total() {
        return this.carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
      }
    },
    methods: {
      carregarCarrinho() {
        this.carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      },
      alterarQuantidade(index, valor) {
        if (this.carrinho[index].quantidade + valor > 0) {
          this.carrinho[index].quantidade += valor;
          this.atualizarLocalStorage();
        }
      },
      removerItem(index) {
        this.carrinho.splice(index, 1);
        this.atualizarLocalStorage();
      },
      atualizarLocalStorage() {
        localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
      },
      finalizarCompra() {
        this.$router.push("/finalizaCompra");
}
    },
    mounted() {
      this.carregarCarrinho();
    }
  };
  </script>
  
  <style scoped>
  .carrinho-container {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
    height: 100vh;
  }
  
  .carrinho-item {
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  
  .carrinho-item img {
    width: 80px;
    border: 1px solid #ddd;
    padding: 5px;
  }
  
  .detalhes {
    flex: 1;
  }
  
  .quantidade-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .quantidade-container button {
    background-color: #ddd;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .remover {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .total {
    text-align: right;
    margin-top: 20px;
    font-size: 20px;
  }
  
  .finalizar-compra {
    width: 20%;
    background-color: #3F0241;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    display: block;
    margin-top: 10px;
  }
  </style>
  