<template>
    <main>
        <div class="container">
            <div class="title">Suporte ao Cliente</div>
            <div class="form-group">
                <label for="email">Informe seu email</label>
                <input type="email" id="email" name="email" placeholder="seuemail@email.com">
            </div>
            <div class="form-group">
                <label for="email">Informe seu nome</label>
                <input type="nome" id="nome" name="nome" placeholder="Nome">
            </div>
            <div class="form-group">
                <label for="comment">Explique com detalhes sua dúvida ou problema</label>
                <textarea id="comment" name="comment" rows="12" placeholder="Digite o texto"></textarea>
            </div>
            <div class="form-group">
                <button class="btn-send">Enviar</button>
                <button class="btn-cancel">Cancelar</button>
            </div>
        </div>
    </main>
</template>

<script setup>



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
</style>