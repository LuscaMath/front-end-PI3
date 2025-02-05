<template>
  <div>
    <h1>Lista de Produtos</h1>
    <div v-if="groupedProdutos.length">
      <div v-for="(grupo, index) in groupedProdutos" :key="index" class="carousel">
        <div v-for="produto in grupo" :key="produto.id_produto" class="produto-card">
          <router-link :to="{ name: 'Produto', params: { id: produto.id_produto } }" class="card-link">
            <div class="card">
              <img :src="`http://127.0.0.1:8000/api/media/${produto.imagem.split('/media/')[1]}`" alt="Imagem do Produto" class="card-img">
              <div class="card-body">
                <h5 class="card-title">{{ produto.nome }}</h5>
                <p class="card-text">{{ produto.descricao }}</p>
                <p class="card-price">Preço: {{ produto.preco }}</p>
                <p class="card-category">Categoria: {{ produto.categoria }}</p>
              </div>
            </div>
          </router-link>
        </div>
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
    computed: {
      groupedProdutos() {
        const grupos = [];
        for (let i = 0; i < this.produtos.length; i += 4) {
          grupos.push(this.produtos.slice(i, i + 4));
        }
        return grupos;
      }
    },
    methods: {
      async fetchProdutos() {
        try {
          const response = await ProdutosService.getProdutos(4);
          this.produtos = response.data;
        } catch (error) {
          console.error("Erro ao buscar Produtos:", error);
        }
      },
    },
    created() {
      this.fetchProdutos();
    }
  };
</script>

<style>
.carousel {
  display: flex;
  overflow-x: auto;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.produto-card {
  flex: 0 0 25%;
  box-sizing: border-box;
  padding: 10px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card {
  width: 300px;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-img {  
  width: 100%;
  height: auto;
}

.card-body {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1.25em;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1em;
  margin-bottom: 10px;
}

.card-price,
.card-category {
  font-size: 0.9em;
  color: #555;
}
</style>