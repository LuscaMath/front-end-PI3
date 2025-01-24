<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="credentials.username" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="credentials.password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
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
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await authService.login(this.credentials);
  
          // Armazena o token no localStorage ou Vuex
          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
  
          // Redireciona para a página principal
          this.$router.push({ name: "home" });
        } catch (error) {
          this.errorMessage = error;
        }
      },
    },
  };
</script>
  
<style>
  .error {
    color: red;
  }
</style>
  