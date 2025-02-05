import api from "./api";

export default {
    getProdutos() {
        return api.get("/produtos/");
    }
}