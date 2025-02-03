<template>
    <main class="account-page">
        <section>
            <div class="containerp">
                <h1>Minha Conta</h1>
                <div class="options">
                    <a href="historico.html" class="box">
                        <img src="../assets/imagens/iconepedidos.png" />
                        <p>Meus pedidos</p>
                    </a>
                    <a href="suporte.html" class="box">
                        <img src="../assets/imagens/iconesuporte.png" />
                        <p>Suporte ao cliente</p>
                    </a>
                </div>
            </div>
            <h2>Dados do Perfil</h2>
        </section>
        <form @submit.prevent="handleEditUser" class="profile">
            <div class="dados">
                <div class="form-groupp">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" v-model="userData.nome_cliente" required>
                </div>
                <div class="form-groupp">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" name="email" v-model="userData.email" required>
                </div>
                <div class="form-groupp">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" v-model="userData.username" required>
                </div>
                <div class="form-groupp">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" v-model="userData.telefone" required>
                </div>
                <button class="edit-user-btn">Editar</button>
            </div>
        </form>
        <form class="profile" @submit.prevent="handleAddAddress">
            <div class="dados">
                <h2 style="margin-bottom: 1rem;">Adicionar um Endereço</h2>
                <div class="form-endereço">
                    <label for="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" v-model="enderecoData.cep" pattern="[0-9]{8}"
                        title="Informe um CEP válido (apenas números)">
                </div>
                <div class="form-endereço">
                    <label for="logradouro">Logradouro:</label>
                    <input v-model="enderecoData.logradouro" type="text" id="logradouro" name="logradouro">
                </div>
                <div class="form-endereço">
                    <label for="numero">Número:</label>
                    <input v-model="enderecoData.numero" type="text" id="numero" name="numero">
                </div>
                <div class="form-endereço">
                    <label for="complemento">Complemento:</label>
                    <input v-model="enderecoData.complemento" type="text" id="complemento" name="complemento">
                </div>
                <button class="edit-user-btn">Adicionar</button>
            </div>
        </form>
        <hr>
        <h2 style="margin-bottom: 1rem; margin-top: 1rem; text-align:center;">Endereços Adicionados</h2>
        <div v-for="endereco in enderecos" :key="endereco.id_endereco" class="profile">
            <form @submit.prevent="handleEditAddress(endereco.id)">
                <div class="dados">
                    <p>Endereço {{ endereco.id }}</p>
                    <div class="form-endereço">
                        <label for="cep">CEP:</label>
                        <input type="text" id="cep" name="cep" v-model="endereco.cep" pattern="[0-9]{8}"
                            title="Informe um CEP válido (apenas números)">
                    </div>
                    <div class="form-endereço">
                        <label for="logradouro">Logradouro:</label>
                        <input v-model="endereco.logradouro" type="text" id="logradouro" name="logradouro">
                    </div>
                    <div class="form-endereço">
                        <label for="numero">Número:</label>
                        <input v-model="endereco.numero" type="text" id="numero" name="numero">
                    </div>
                    <div class="form-endereço">
                        <label for="complemento">Complemento:</label>
                        <input v-model="endereco.complemento" type="text" id="complemento" name="complemento">
                    </div>
                    <button class="edit-user-btn">Editar Endereço</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import ClienteService from '@/services/ClienteService';

export default {
    data() {
        return {
            userData: {
                username: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                nome_cliente: localStorage.getItem("nome_cliente"),
                telefone: localStorage.getItem("telefone")
            },
            enderecoData: {
                id_cliente: localStorage.getItem("userId"),
                cep: '',
                logradouro: '',
                numero: '',
                complemento: ''
            },
            enderecos: []
        };
    },
    methods: {
        async handleEditUser() {
            try {
                const id_user = localStorage.getItem("userId");
                const response = await ClienteService.updateCliente(id_user, this.userData);
                localStorage.setItem("username", this.userData.username);
                localStorage.setItem("email", this.userData.email);
                localStorage.setItem("nome_cliente", this.userData.nome_cliente);
                localStorage.setItem("telefone", this.userData.telefone);
                window.location.reload();
                alert('Dados atualizados com sucesso!');
            } catch (error) {
                alert('Erro ao atualizar os dados');
            }
        },
        async handleAddAddress() {
            try {
                const id_user = localStorage.getItem("userId");
                const response = await ClienteService.addEndereco(id_user, this.enderecoData);
                alert('Endereço adicionado com sucesso!');
            } catch (error) {
                alert('Erro ao adicionar o endereço');
            }
        },
        async getAddress() {
            try {
            const id_user = localStorage.getItem("userId");
            const response = await ClienteService.getClienteEnderecos(id_user);
            this.enderecos = response.data;
            } catch (error) {
            alert('Erro ao buscar o endereço');
            }
        },
        async handleEditAddress(id_endereco) {
            try {
                const response = await ClienteService.editClientesEnderecos(id_endereco, this.enderecoData);
                alert('Endereço atualizado com sucesso!');
            } catch (error) {
                alert('Erro ao atualizar o endereço');
            }
        }
    },
    mounted() {
        this.getAddress();
    },
};
</script>

<style scoped>
.edit-user-btn {
    padding: 0.3rem 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    background-color: #FFDF1B;
    border: none;
    border-radius: 5px;
}

.profile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.account-page {
    margin: 40px 7vw;
    align-items: center;
}

.titleb {
    font-size: 2em;
    margin-bottom: 20px;
    margin-top: 0px;
    text-align: center;
}

.titlep {
    font-size: 30px;
    margin-bottom: 20px;
    margin-top: 0px;
}

.account-page h2 {
    font-weight: normal;
}

.options {
    display: flex;
    margin: 20px 0;
    align-items: center;
    justify-content: space-around;
}

.box {
    background-color: #F1F1F1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    padding: 10px;
    margin: 10px 0;
    width: 25vw;
    height: 2vw;
    min-height: 45px;
    box-shadow: inset 0 0 20px #d6d6d6;
    border-width: medium;
    border-style: solid;
    border-color: #d6d6d6;
}

.box img {
    height: 70%;
    padding-right: 10%;
}

.box p {
    font-size: 1.5vw;
}

#boxsuporte {
    margin-left: 160px;
}

.box p {
    text-decoration: none;
    color: black;
}

.box:hover {
    background-color: #dbdbdb;
    transition: background-color 0.2s ease;
}

/* --------------------------------------------------------------------------------*/
.dados {
    justify-content: center;
    align-items: center;
    width: 60%;
}

.form-groupp {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.form-groupp input[type="text"],
input[type="email"],
input[type="tel"] {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: inset 0 0 5px #d6d6d6;

}

.form-endereço label {
    margin-right: 10px;
}

.form-endereço input {
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: inset 0 0 5px #d6d6d6;
    padding: 10px;
    flex: 1;
}

.form-endereço {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.dados h3 {
    font-size: 1.2em;
    padding-top: 10px;
}

.cards {
    width: 100%;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0 20px;
}

.card-data {
    background-color: #F1F1F1;
    padding: 20px;
    border-radius: 10px;
    width: 40%;
    min-height: 7.6vw;
}

.card-brand {
    width: 20%;
}

.card-data-top {
    display: flex;
    justify-content: space-between;
}

.card-data-top img {
    left: 0;
    border: 1px solid rgb(107, 107, 107);
    border-radius: 5px;
}

.card-data-top p {
    position: relative;
    top: 0;
    margin: 0;
}

.card-data-top a {
    padding-left: 2px;
    color: #008DE0;
}

.card-data-bottom {
    margin-top: 15px;
}

.card-data-bottom p {
    margin: 0;
}

.card-name {
    font-weight: bold;
}

.new-card-data {
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border-radius: 10px;
    width: 40%;
    min-height: 7.6vw;
    border: 1px dashed rgb(202, 202, 202);
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.new-card-data img {
    width: 15%;
    padding: 1em;
}

.new-card-data p {
    color: #555555;
    margin: 0;
}

.new-card-data:hover {
    background-color: #c4c4c4;
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.dados button[type="submit"] {
    padding: 10px 20px;
    background-color: #B2E3FF;
    color: #000000;
    border-radius: 10px;
    border: 1px solid #a1dcff;
    box-shadow: inset 0 0 5px #a2dbfc;
    cursor: pointer;
    font-weight: bold;
}

.dados button[type="submit"]:hover {
    background-color: #7fd0ff;
    transition: background-color 0.2s ease;
}

#button {
    text-align: right;
}
</style>
