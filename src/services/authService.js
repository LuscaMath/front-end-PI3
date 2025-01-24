import api from "./api";

export default {
  // M�todo para fazer login
  login(credentials) {
    return api.post("/auth/login/", credentials); // Endpoint para obter o token
  },

  // M�todo para renovar o token (se necess�rio)
  refreshToken(refreshToken) {
    return api.post("/auth/refresh/", { refresh: refreshToken });
  },
};
