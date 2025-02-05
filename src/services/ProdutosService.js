import api from './api';

export default {
  getProdutos() {
    return api.get('/produtos/');
  },
  getProduto(id) {
    return api.get(`/produtos/${id}/`);
  }
};