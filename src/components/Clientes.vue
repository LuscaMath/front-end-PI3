<template>
    <div>
      <h1>Lista de Clientes</h1>
      <div v-if="cliente">
        <p>Id: {{ cliente.id }}</p>
        <p>Nome: {{ cliente.nome_cliente }}</p>
        <p>Email: {{ cliente.email_cliente }}</p>
      </div>
      <p v-else>Cliente não encontrado</p>
    </div>
  </template>
  
<script>
  import clienteService from "@/services/ClienteService";
  
  export default {
    data() {
      return {
        cliente: null,
      };
    },
    methods: {
      async fetchClientes() {
        try {
          const client_id = localStorage.getItem('userId');
          const response = await clienteService.getClienteById(client_id);
          this.cliente = response.data;
        } catch (error) {
          console.error("Erro ao buscar clientes:", error);
        }
      },
    },
    mounted() {
      this.fetchClientes();
    },
  };
</script>
  