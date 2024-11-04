<script setup lang="ts"></script>

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
        <button v-if="isLoggedIn">Se déconnecter</button>
        <button v-else>Se connecter</button>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        isLoggedIn: true,
        isAdmin: false // Par exemple, une autre variable pour gérer l'état d'admin
      };
    }
  };
</script>