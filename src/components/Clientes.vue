<template>
    <div>
      <h1>Lista de Clientes</h1>
      <div v-if="cliente">
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
          const response = await clienteService.getClienteById('2');
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
  