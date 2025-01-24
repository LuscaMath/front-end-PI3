import api from "./api";

export default {
  // Método para fazer login
  login(credentials) {
    return api.post("/auth/login/", credentials); // Endpoint para obter o token
  },

  // Método para renovar o token (se necessário)
  refreshToken(refreshToken) {
    return api.post("/auth/refresh/", { refresh: refreshToken });
  },
};
