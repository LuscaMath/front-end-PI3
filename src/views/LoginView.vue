<template>
  <main class="main-login">
    <div class="form-wrapper">
      <div class="login_container">
        <h2>Faça o Login</h2>
        <form @submit.prevent="handleLogin">
          <div>
            <input placeholder="Usuário" type="text" v-model="credentials.username" id="username" required />
          </div>
          <div>
            <input placeholder="Senha" type="password" v-model="credentials.password" id="password" required />
          </div>
          <button type="submit">Entrar</button>
        </form>

      </div>
      <div class="register_container">
        <h2>Crie sua Conta</h2>
        <form @submit.prevent="handleRegister">
          <div>
            <input placeholder="Usuário" type="text" v-model="registerData.username" id="username_register" required />
          </div>
          <div>
            <input placeholder="Email" type="email" v-model="registerData.email" id="email_register" required />
          </div>
          <div>
            <input placeholder="Senha" type="password" v-model="registerData.password" id="password_register"
              required />
          </div>
          <div>
            <input placeholder="Nome" type="text" v-model="registerData.nome_cliente" id="nome_register" required />
          </div>
          <div>
            <input placeholder="Telefone" type="text" v-model="registerData.telefone" id="telefone_register" required />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import authService from "@/services/authService";

export default {
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      errorMessage: "",
      registerData: {
        username: "",
        email: "",
        password: "",
        nome_cliente: "",
        telefone: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await authService.login(this.credentials);

        // Armazena o token no localStorage ou Vuex
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        const user = response.data.user;
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        localStorage.setItem("nome_cliente", user.nome_cliente);
        localStorage.setItem("telefone", user.telefone);

        // Redireciona para a p�gina principal
        this.$router.push({ name: "home" });
      } catch (error) {
        this.errorMessage = error;
        alert("Usuário ou senha inválidos");
        this.credentials.username = "";
        this.credentials.password = "";
      }
    },

    async handleRegister() {
      try {
        const response = await authService.register(this.registerData);
        alert("Usuário cadastrado com sucesso!");

      } catch (error) {
        this.errorMessage = error;
        console.error(error);
        alert("Erro ao cadastrar usuário");
        this.registerData.username = "";
        this.registerData.email = "";
        this.registerData.password = "";
        this.registerData.nome = "";
        this.registerData.telefone = "";
      }
    }
  },
};
</script>

<style>
.error {
  color: red;
}

.main-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

.form-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.login_container,
.register_container {
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border-right: 1px solid lightgray;
}

.login_container h2,
.register_container h2 {
  margin-bottom: 1rem;
}


.login_container form,
.register_container form {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.register_container {
  border: none;
}

.login_container form input,
.register_container form input {
  width: 300px;
  padding: 1rem 1rem;
  border-radius: 1rem;
  border: 1px solid lightgray;
}

.login_container form button,
.register_container form button {
  width: 50%;
  box-sizing: border-box;
  padding: 13px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  cursor: pointer;
  background-color: #B2E3FF;
  color: black;
}

.register_container form button {
  background-color: #FFDF1B;
}
</style>