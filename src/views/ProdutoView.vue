<template>
  <div>
    <h1>Detalhes do Produto</h1>
    <img :src="`http://127.0.0.1:8000/api/media/${produto.imagem.split('/media/')[1]}`" alt="Imagem do Produto" class="card-img">
    <p>ID do Produto: {{ id }}</p>
    <p>Nome do Produto: {{ produto.nome }}</p>
    <p>Descrição do Produto: {{ produto.descricao }}</p>
    <p>Preço do Produto: {{ produto.preco }}</p>
  </div>
</template>

<script>
import ProdutosService from "@/services/ProdutosService";
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
    data() {
        return {
        produto: {}
        };
    },
  methods: {
    async fetchProduto() {
      try {
        const response = await ProdutosService.getProduto(this.id);
        this.produto = response.data;
      } catch (error) {
        console.error("Erro ao buscar Produto:", error);
      }
    }
  },
    created() {
        this.fetchProduto();
    }
};
</script>