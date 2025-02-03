<template>
    <header>
        <div class="top-part">
            <img class="logo" src="./assets/imagens/logomarca.png" alt="">
            <div class="search-bar">
                <input type="text" placeholder="O que você está procurando?" />
                <a href="busca.html"><button>
                        <img src="./assets/imagens/lupa.png" alt="Buscar" />
                    </button></a>
            </div>
            <div class="profile-cart">
                <RouterLink to="/perfil">
                    <div class="profile">
                        <img src="./assets/imagens/perfil.png" alt="">
                        <p>Perfil</p>
                    </div>
                </RouterLink>

                <a href="carrinho.html"><img src="./assets/imagens/carrinho.png" alt=""></a>
                <button class="logout" v-if="isAuthenticated" @click="logout">Sair</button>
            </div>
        </div>
        <div class="bottom-part">
            <button class="hamburger" id="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
            <nav class="nav-links" id="nav-links">
                <RouterLink to="/">CÃES</RouterLink>
                <RouterLink to="/">GATOS</RouterLink>
                <RouterLink to="/">TODOS</RouterLink>
            </nav>
        </div>
    </header>
    <RouterView class="teste" />
    <footer>
        <div class="footer">
            <div class="about">
                <h3>Sobre</h3>
                <p><a href="sobre.html">Quem somos</a></p>
                <p><a href="suporte.html">Fale conosco</a></p>
            </div>
            <div class="services">
                <h3>Serviços</h3>
                <p><a href="">Venda para Petshops</a></p>
                <p><a href="">Entrega</a></p>
                <p><a href="">Troca e devolução</a></p>
            </div>
            <div class="social-media">
                <h3>Redes sociais</h3>
                <p class="social-media-logos">
                    <a href="https://instagram.com/maralucypets" target="_blank"><img
                            src="./assets/imagens/insta.png" /></a>
                    <a href=""><img src="./assets/imagens/wpp.png" /></a>
                </p>
            </div>
            <div class="company">
                <img src="./assets/imagens/logomarca.png" class="company-logomark" />
                <p>CNPJ: 50.716.105/0001-10</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';

const isAuthenticated = ref(!!localStorage.getItem('accessToken'));

watchEffect(() => {
  isAuthenticated.value = !!localStorage.getItem('accessToken');
});

// 🔹 Criando um MutationObserver para detectar mudanças no localStorage
let observer;

onMounted(() => {
  const targetNode = document.createElement("div");
  targetNode.style.display = "none";
  document.body.appendChild(targetNode);
  
  observer = new MutationObserver(() => {
    isAuthenticated.value = !!localStorage.getItem('accessToken');
  });

  observer.observe(targetNode, { childList: true });

  // Sobrescrevendo `localStorage.setItem` para acionar o MutationObserver
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    targetNode.innerHTML = key + ":" + value;
  };
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const logout = () => {
  localStorage.removeItem('accessToken');
  isAuthenticated.value = false;
  window.location.reload();
};
</script>

<style scoped>

header {
    display: flex;
    flex-direction: column;
    align-items: center;
}

header .top-part {
    padding: 2rem;
    width: 100%;
    background-color: #3F0241;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

header .top-part .logo {
    width: 180px;
}

header .top-part .search-bar {
    display: flex;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 25px;
    padding: 0.7rem;
    border-radius: 15px;
    width: 30vw;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

header .top-part .search-bar input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: #333;
}

header .top-part .search-bar input::placeholder {
    color: #999;
}

header .top-part .search-bar button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

header .top-part .search-bar button img {
    width: 20px;
    height: 20px;
}

header .top-part .profile-cart {
    display: flex;
    align-items: center;
    gap: 2rem;
}

header .top-part .profile-cart .profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

header .top-part .profile-cart .profile img {
    width: 50px;
}

header .top-part .profile-cart .profile p {
    color: #ffffff;
    font-weight: bold;
}

header .top-part .profile-cart img {
    width: 80px;
}

header .bottom-part {
    padding: 1rem;
    width: 100%;
    background-color: #FDF280;
}

header .bottom-part nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

header .bottom-part nav a {
    font-size: 20px;
    color: #370035;
    font-weight: bold;
    text-decoration: none;
}

header .bottom-part nav a:hover {
    color: rgb(204, 135, 8);
}

.hamburger {
    display: none;
    /* Oculto por padrão em telas grandes */
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
}

.hamburger .bar {
    width: 25px;
    height: 3px;
    background-color: #370035;
    border-radius: 5px;
}

.logout {
    background-color:#FDF280;
    color: #000000;
    padding: 0.2rem 1rem;
    border: 0;
    border-radius: 15px;
    transition: 1s;
}

.logout:hover {
    cursor: pointer;
    background-color: #ffffff;
}


@media (max-width: 1000px) {
    header .top-part {
        gap: 1rem;
        flex-direction: column;
    }

    header .top-part .search-bar {
        width: 100%;
    }

    header .bottom-part nav {
        flex-direction: column;
        position: absolute;
        right: 0;
        background-color: #FDF280;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }

    header .bottom-part nav.show {
        max-height: 200px;
        /* Exibe o menu */
    }

    .hamburger {
        display: flex;
        margin: 0 auto;
    }
}

.footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
    background-image: linear-gradient(#3F0241, #240025);
    color: white;
    padding: 20px 7% 30px;
}

.footer h3 {
    font-size: 1.1em;
    font-weight: bolder;
}

.footer p {
    font-size: 0.9em;
}

.footer a {
    color: white;
}

.footer p a:hover {
    font-size: 1em;
    font-weight: bold;
}

.footer1 {
    margin-top: 13.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
    background-image: linear-gradient(#3F0241, #240025);
    color: white;
    padding: 20px 7% 30px;
}

.footer1 h3 {
    font-size: 1.1em;
    font-weight: bolder;
}

.footer1 p {
    font-size: 0.9em;
}

.footer1 a {
    color: white;
}

.footer1 p a:hover {
    font-size: 1em;
    font-weight: bold;
}

.about {
    width: 20%;
    max-width: 20%;
    height: auto;
}

.services {
    width: 20%;
    padding-left: 10px;
    max-width: 25%;
    height: auto;
}

.social-media {
    padding-left: 10px;
    width: 20%;
    max-width: 25%;
    height: auto;
}

.social-media-logos {
    display: flex;
    flex-wrap: wrap;
}

.social-media-logos a img {
    padding-right: 10px;
    width: 30px;
    height: 30px;
}

.social-media-logos a:hover img {
    transform: scale(1.08);
}

.company {
    max-width: 25%;
    height: auto;
    text-align: right;
    padding-top: 1%;
    overflow-x: auto;
}

.company-logomark {
    max-width: 20%;
}

.company-logotype {
    max-width: 55%;
}

.logo {
    position: relative;
    display: flex;
    height: 100%;
    width: 40%;
    padding-left: 7vw;
}

.logomark {
    position: sticky;
    height: 100%;
    width: auto;
}

.logotype {
    position: absolute;
    padding-left: 2vw;
    width: 14vw;
    height: auto;
    top: 50%;
    transform: translateY(-50%);
}

.company p {
    font-size: 0.8em;
}
</style>
