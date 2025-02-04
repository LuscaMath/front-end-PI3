<template>
    <main>
        <div class="container">
            <div class="title">Suporte ao Cliente</div>
            <div class="form-group">
                <label for="email">Informe seu email</label>
                <input v-model="userData.email" type="email" id="email" name="email" placeholder="seuemail@email.com">
            </div>
            <div class="form-group">
                <label for="email">Informe seu nome</label>
                <input v-model="userData.nome" type="nome" id="nome" name="nome" placeholder="Nome">
            </div>
            <div class="form-group">
                <label for="comment">Explique com detalhes sua dÃºvida ou problema</label>
                <textarea v-model="suporteData.descricao_problema" id="comment" name="comment" rows="12" placeholder="Digite o texto"></textarea>
            </div>
            <div class="form-group">
                <button @click="handleAddSuport" class="btn-send">Enviar</button>
            </div>
            <hr>
            <br>
            <h2>Suportes Enviados Pelo Cliente</h2>
            <br>
            <div class="suportes-container">
                <div v-for="suporte in suportes" :key="suporte.id_suporte" class="suporte-item">
                    <button @click="confirmDeleteSuporte(suporte.id_suporte)" class="btn-delete">x</button>
                    <p><strong>Id:</strong> {{ suporte.id_suporte }}</p>
                    <p><strong>Data:</strong> {{ suporte.data_contato }}</p>
                    <p><strong>Descrição:</strong> {{ suporte.descricao_problema }}</p>
                </div>
            </div>
     
        </div>
    </main>
</template>

<script>
import ClienteService from '@/services/ClienteService';


export default {
    data() {
        return {
            userData: {
                email: localStorage.getItem('email'),
                nome: localStorage.getItem('nome_cliente'),
            },
            suporteData: {
                id_cliente: localStorage.getItem('userId'),
                data_contato: null,
                descricao_problema: '',
            },
            suportes: [],
        };
    },
    methods: {
        async handleAddSuport() {
            try {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                const year = today.getFullYear();
                this.suporteData.data_contato = `${year}-${month}-${day}`; // Ajuste do formato da data
                console.log(this.suporteData);
                await ClienteService.addSuporte(this.suporteData.id_cliente, this.suporteData);
                alert('Suporte enviado com sucesso!');
                this.suporteData.descricao_problema = '';
                this.fetchSuportes();
            } catch (error) {
                console.error('Erro ao enviar suporte:', error);
                alert('Ocorreu um erro ao enviar o suporte. Por favor, tente novamente.');
            }
        },
        async fetchSuportes() {
            try {
                const response = await ClienteService.getClienteSuporte(this.suporteData.id_cliente);
                this.suportes = response.data;
            } catch (error) {
                console.error('Erro ao buscar suportes:', error);
            }
        },
        async handleDeleteSuporte(id) {
            try {
                const userId = localStorage.getItem('userId');
                await ClienteService.deleteClienteSuporte(userId, id);
                alert('Suporte deletado com sucesso!');
                this.fetchSuportes();
            } catch (error) {
                console.error('Erro ao deletar suporte:', error);
                alert('Ocorreu um erro ao deletar o suporte. Por favor, tente novamente.');
            }
        },
        confirmDeleteSuporte(id) {
            if (confirm('Tem certeza que deseja deletar este suporte?')) {
                this.handleDeleteSuporte(id);
            }
        },
    },
    mounted() {
        this.fetchSuportes();
    },
};

</script>

<style scoped>
.container {
    width: 85%;
    margin: 16px auto;
}

.title {
    font-size: 24px;
    margin-bottom: 20px;
    margin-top: 50px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input[type="email"] {
    width: 45%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #d3d3d3;
}

.form-group input[type="nome"] {
    width: 45%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #d3d3d3;
}

textarea {
    width: 65%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #d3d3d3;
}

.form-group button {
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;


}

.btn-send {
    background-color: #B2E3FF;
    color: black;
    margin-right: 10px;


}

.btn-cancel {
    background-color: #d3d3d3;
    color: black;
    margin-bottom: 92px;

}

.btn-delete {
    background-color: #FF0000;
    color: white;
    margin-bottom: 10px;
    margin-right: 10px;
    cursor: pointer;
    border: none;
    padding: 0.3rem;
}

.suporte-item {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
</style>