<script setup lang="ts">
</script>

<template>
  <header>
    <div  class="header-container">
      <div class="header-container__logo">
        <p>LOGO</p>
      </div>

      <div class="header-container__nav">
        <a href="/">Liste des personnes disparues</a>
      </div>
  
      <div class="header-container__profil">
        <button v-if="isLoggedIn()" class="header-container__deconnexion" @click="deconnexion">Se déconnecter</button>
        <router-link  v-else to="/auth">
          <button>Se connecter</button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      isLoggedIn() {
        return localStorage?.getItem('token') !== null;
      },
      deconnexion() {
        localStorage?.removeItem('token');
        this.$forceUpdate();
      }
    }
  };
</script>