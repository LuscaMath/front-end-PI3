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

  addEndereco(id, enderecoData) {
    return api.post(`clientes/${id}/enderecos/`, enderecoData);
  },

  getClienteEnderecos(id) {
    return api.get(`clientes/${id}/enderecos/`);
  },

  editClientesEnderecos(id, enderecoId, enderecoData) {
    return api.put(`clientes/${id}/enderecos/${enderecoId}/`, enderecoData);
  },

  deleteClienteEndereco(id, enderecoId) {
    return api.delete(`clientes/${id}/enderecos/${enderecoId}/`);
  }
};
