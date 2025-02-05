<template>
  <div>
    <h1>Lista de Produtos</h1>
    <div v-if="produtos.length">
      <div v-for="produto in produtos" :key="produto.id_produto">
        <p>Id: {{ produto.id_produto }}</p>
        <p>Nome: {{ produto.nome }}</p>
        <p>Descrição: {{ produto.descricao }}</p>
        <p>Preço: {{ produto.preco }}</p>
        <p>Categoria: {{ produto.categoria }}</p>
        <img :src="`http://127.0.0.1:8000/api/media/${produto.imagem.split('/media/')[1]}`" alt="Imagem do Produto">
      </div>
    </div>
    <p v-else>Produto não encontrado</p>
  </div>
</template>
  
<script>
  import ProdutosService from "@/services/ProdutosService";
  
  export default {
    data() {
      return {
        produtos: [],
      };
    },
    methods: {
      async fetchProdutos() {
        try {
          const response = await ProdutosService.getProdutos();
          this.produtos = response.data;
        } catch (error) {
          console.error("Erro ao buscar Produtos:", error);
        }
      },
    },
    created() {
      this.fetchProdutos();
    },
  };
</script>
  