import api from "./api";

export default {
  // Obter lista de clientes
  getClientes() {
    return api.get("/clientes/");
  },

  // Obter cliente pelo ID
  getClienteById(id) {
    return api.get(`/clientes/${id}/`);
  },

  // Criar novo cliente
  createCliente(cliente) {
    return api.post("/clientes/", cliente);
  },

  // Atualizar cliente
  updateCliente(id, cliente) {
    return api.put(`/clientes/${id}/`, cliente);
  },

  // Deletar cliente
  deleteCliente(id) {
    return api.delete(`/clientes/${id}/`);
  },
};
