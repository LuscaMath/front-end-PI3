<template>
    <div>
      <h1>Lista de Produtos</h1>
      <div v-if="groupedProdutos.length">
        <div v-for="(grupo, index) in groupedProdutos" :key="index" class="carousel">
          <div v-for="produto in grupo" :key="produto.id_produto" class="produto-card">
            <router-link :to="{ name: 'produto', params: { id: produto.id_produto, nome: produto.nome, descricao: produto.descricao, urlImage: produto.imagem } }" class="card-link">
              <div class="card">
                <img :src="`http://127.0.0.1:8000/api/media/${produto.imagem.split('/media/')[1]}`" alt="Imagem do Produto" class="card-img">
                <div class="card-body">
                  <h5 class="card-title">{{ produto.nome }}</h5>
                  <p class="card-text">{{ produto.descricao }}</p>
                  <p class="card-price">Preço: {{ 'R$' + produto.preco }}</p>
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
          // Agrupa os produtos em grupos de 3 (ou qualquer outro número desejado)
          const grupos = [];
          for (let i = 0; i < this.produtos.length; i += 3) {
            grupos.push(this.produtos.slice(i, i + 3));
          }
          return grupos;
        }
      },
      methods: {
        async fetchProdutos() {
          try {
            const response = await ProdutosService.getProdutos();
            this.produtos = response.data.filter(produto => produto.categoria === 'Cachorro');
          } catch (error) {
            console.error('Erro ao buscar produtos:', error);
          }
        }
      },
      created() {
        this.fetchProdutos();
      }
    };
  </script>