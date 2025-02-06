<template>
  <div class="finalizar-compra-container">
    <h1>Finalizar Compra</h1>

    <!-- Formulário de dados do usuário -->
    <form @submit.prevent="finalizarCompra">
      <div class="form-group">
        <label for="nome">Nome Completo</label>
        <input type="text" id="nome" v-model="usuario.nome" required />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="usuario.email" required />
      </div>

      <div class="form-group">
        <label for="endereco">Endereço</label>
        <input type="text" id="endereco" v-model="endereco" required />
      </div>

      <!-- Informações do Cartão -->
      <div class="form-group">
        <label for="numero-cartao">Número do Cartão</label>
        <input type="text" id="numero-cartao" v-model="numeroCartao" maxlength="19" required />
      </div>

      <div class="form-group">
        <label for="data-vencimento">Data de Vencimento</label>
        <input type="text" id="data-vencimento" v-model="dataVencimento" placeholder="MM/AA" maxlength="5" required />
      </div>

      <div class="form-group">
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" v-model="cvv" maxlength="4" required />
      </div>

      <!-- Resumo do Carrinho -->
      <div v-if="carrinho.length > 0">
        <div v-for="(item, index) in carrinho" :key="item.id" class="resumo-item">
          <img :src="`http://127.0.0.1:8000/api/media/${item.imagem.split('/media/')[1]}`" alt="Imagem do produto" />
          <div class="detalhes">
            <h2>{{ item.nome }}</h2>
            <p>Preço: R$ {{ item.preco.toFixed(2) }}</p>
            <p>Quantidade: {{ item.quantidade }}</p>
            <p>Total: R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
          </div>
        </div>

        <h2 class="total">Total da Compra: R$ {{ total.toFixed(2) }}</h2>
      </div>

      <!-- Botão para finalizar -->
      <button type="submit" class="finalizar-btn">Finalizar Compra</button>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      carrinho: [],
      nome: "",
      email: "",
      endereco: "",
      numeroCartao: "",
      dataVencimento: "",
      cvv: "",
      usuario: {
        nome: localStorage.getItem("nome_cliente") || "",
        email: localStorage.getItem("email") || "",
      }
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
    validarCartao() {
      // Validação básica para o número do cartão, data de vencimento e CVV
      const numeroCartaoRegex = /^[0-9]{16}$/; // Verifica se o número do cartão tem 16 dígitos
      const dataVencimentoRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/; // Verifica o formato MM/AA
      const cvvRegex = /^[0-9]{3,4}$/; // Verifica se o CVV tem 3 ou 4 dígitos

      if (!numeroCartaoRegex.test(this.numeroCartao)) {
        alert("Número do cartão inválido. Insira 16 dígitos.");
        return false;
      }
      if (!dataVencimentoRegex.test(this.dataVencimento)) {
        alert("Data de vencimento inválida. Use o formato MM/AA.");
        return false;
      }
      if (!cvvRegex.test(this.cvv)) {
        alert("CVV inválido. Insira 3 ou 4 dígitos.");
        return false;
      }
      return true;
    },
    finalizarCompra() {
    if (this.carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    // Salva os dados da compra no localStorage antes de limpar
    localStorage.setItem("ultimaCompra", JSON.stringify(this.carrinho));

    // Limpa o carrinho
    localStorage.removeItem("carrinho");

    // Redireciona para "Minhas Compras"
    this.$router.push("/minhasCompras");
  }
  },
  mounted() {
    this.carregarCarrinho();
  }
};
</script>

<style scoped>
.finalizar-compra-container {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.resumo-item {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.resumo-item img {
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

.finalizar-btn {
  background-color: #3F0241;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  display: block;
  margin-top: 10px;
}
</style>
