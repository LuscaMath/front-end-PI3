import api from './api';

export default {
  getProdutos() {
    return api.get('/produtos/');
  },
  getProduto(id) {
    return api.get(`/produtos/${id}/`);
  },
  getEstoques(id) {
    return api.get(`/produtos/${id}/estoque/`);
  },
  getEstoque(id_produto, id_estoque) {
    return api.get(`/produtos/${id_produto}/estoque/${id_estoque}/`);
  }
};