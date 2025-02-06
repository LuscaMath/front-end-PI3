<template>
  <h1>{{ produto.nome }}</h1>
  <div class="produto-detalhes">
    <div class="imagens-container">
      <div class="imagem-principal">
        <img :src="`http://127.0.0.1:8000/api/media/${imagemSelecionada.split('/media/')[1]}`" alt="Imagem Principal" />
      </div>
    </div>
    <div class="detalhes">
      <p class="preco">Por: <strong>R$ {{ produto.preco }}</strong></p>
      <p class="descricao">{{ produto.descricao }}</p>
      <p>Disponível: {{ estoque.quantidade_disponivel > 0 ? estoque.quantidade_disponivel : 'Indisponível' }}</p>

      <div class="quantidade-container">
        <button @click="alterarQuantidade(-1)" :disabled="quantidade <= 1">-</button>
        <span>{{ quantidade }}</span>
        <button @click="alterarQuantidade(1)">+</button>
      </div>

      <button class="botao-comprar" @click="adicionarAoCarrinho" :disabled="estoque.quantidade_disponivel <= 0">
        Adicionar ao Carrinho
      </button>
    </div>
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
      produto: {},
      imagemSelecionada: "",
      quantidade: 1,
      estoques: [],
      estoque: {}
    };
  },
  methods: {
    async fetchProduto() {
      try {
        const response = await ProdutosService.getProduto(this.id);
        this.produto = response.data;
        this.imagemSelecionada = this.produto.imagem;
      } catch (error) {
        console.error("Erro ao buscar Produto:", error);
      }
    },
    async fetchEstoques() {
      try {
        const response = await ProdutosService.getEstoques(this.id);
        this.estoques = response.data;
        this.fetchEstoqueProduto();
      } catch (error) {
        console.error("Erro ao buscar Estoque:", error);
      }
    },
    fetchEstoqueProduto() {
      if (this.estoques.length > 0) {
        this.estoque = this.estoques.find(estoque => estoque.produto_id === this.produto.id) || {};
      }
    },
    alterarQuantidade(valor) {
      if (this.quantidade + valor >= 1) {
        this.quantidade += valor;
      }
    },
    adicionarAoCarrinho() {
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      // Verifica se o produto já está no carrinho
      let itemExistente = carrinho.find(item => item.id === this.id);

      if (itemExistente) {
        // Se já existe, apenas aumenta a quantidade
        itemExistente.quantidade += this.quantidade;
      } else {
        // Caso contrário, adiciona um novo item sem sobrescrever os anteriores
        let novoItem = {
          id: this.id,
          nome: this.produto.nome,
          preco: this.produto.preco,
          imagem: this.produto.imagem,
          quantidade: this.quantidade
        };
        carrinho.push(novoItem);
      }

      // Atualiza o localStorage
      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      console.log("Produto adicionado ao carrinho:", carrinho);
    }
  },
  async mounted() {
    await this.fetchProduto();
    await this.fetchEstoques();
  }
};
</script>

<style scoped>
.produto-detalhes {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 2rem;
  height: 70vh;
}

.imagens-container {
  display: flex;
  gap: 10px;
}

.miniaturas {
  display: flex;
  flex-direction: column;
}

.miniatura {
  width: 50px;
  height: auto;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 5px;
  margin-bottom: 5px;
}

.imagem-principal img {
  width: 450px;
  border: 1px solid #ddd;
  padding: 10px;
}

.detalhes {
  flex: 1;
}

.preco {
  font-size: 25px;
  color: #000;
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

.botao-comprar {
  background-color: #3F0241;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  color: #ffffff;
}
</style>
