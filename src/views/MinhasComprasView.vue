<template>
    <div class="minhas-compras-container">
      <h1>Minhas Compras</h1>
  
      <div v-if="compras.length > 0">
        <div v-for="(item, index) in compras" :key="index" class="compra-item">
          <img :src="`http://127.0.0.1:8000/api/media/${item.imagem.split('/media/')[1]}`" alt="Imagem do produto" />
          <div class="detalhes">
            <h2>{{ item.nome }}</h2>
            <p>Preço: R$ {{ item.preco.toFixed(2) }}</p>
            <p>Quantidade: {{ item.quantidade }}</p>
            <p>Subtotal: R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
          </div>
        </div>
        <h2 class="total">Status: Pago</h2>
        <h2 class="total">Total da Compra: R$ {{ totalCompra.toFixed(2) }}</h2>
      </div>
      <p v-else>Nenhuma compra encontrada.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        compras: []
      };
    },
    computed: {
      totalCompra() {
        return this.compras.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
      }
    },
    mounted() {
      const ultimaCompra = JSON.parse(localStorage.getItem("ultimaCompra")) || [];
      this.compras = ultimaCompra;
    }
  };
  </script>
  
  <style scoped>
  .minhas-compras-container {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
    height: 70vh;
  }
  
  .compra-item {
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  
  .compra-item img {
    width: 80px;
    border: 1px solid #ddd;
    padding: 5px;
  }
  
  .detalhes {
    flex: 1;
  }
  
  .total {
    text-align: right;
    margin-top: 20px;
    font-size: 20px;
  }
  </style>
  