<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="top-part">
      <RouterLink to="/"><img class="logo" src="./assets/imagens/logomarca.png" alt=""></RouterLink>
      <div class="search-bar">
        <input type="text" placeholder="O que você está procurando?" />
        <a href="busca.html"><button>
            <img src="./assets/imagens/lupa.png" alt="Buscar" />
          </button></a>
      </div>
      <div class="profile-cart">
        <a href="perfil.html">
          <div class="profile">
            <img src="./assets/imagens/perfil.png" alt="">
            <p>Perfil</p>
          </div>
        </a>

        <a href="carrinho.html"><img src="./assets/imagens/carrinho.png" alt=""></a>
      </div>
    </div>
    <div class="bottom-part">
      <button class="hamburger" id="hamburger">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav class="nav-links" id="nav-links">
        <RouterLink to="/">C�ES</RouterLink>
        <RouterLink to="/">GATOS</RouterLink>
        <RouterLink to="/">TODOS</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

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
</style>

