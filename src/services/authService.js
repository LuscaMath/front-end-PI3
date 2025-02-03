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

  register(credentials_register) {
    return api.post("/auth/register/", credentials_register);
  },

  update(id, credentials_update) {
    return api.put(`/auth/update/${id}/`, credentials_update);
  }


};
