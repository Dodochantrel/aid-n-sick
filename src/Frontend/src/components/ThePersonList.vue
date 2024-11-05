<script setup lang="ts">
import { defineProps } from 'vue';

// Définir le type Person
type Person = {
  nom: string;
  prenom: string;
  icon: string;
  ville: string;
  codePostal: string;
};

// Définir les props avec les types
defineProps<{
  persons: Person[]; // Utiliser le type Person pour les props
}>();
</script>

<template>
  <table class="person-table">
    <thead>
      <tr>
        <th>Icon</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Ville</th>
        <th>Code Postal</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(person, index) in persons" :key="index">
        <td><img :src="person.icon" alt="Icon visage" class="person-icon" /></td>
        <td>{{ person.nom }}</td>
        <td>{{ person.prenom }}</td>
        <td>{{ person.ville }}</td>
        <td>{{ person.codePostal }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.person-table {
  width: 100%;
  border-collapse: collapse;
}

.person-table th,
.person-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.person-table th {
  background-color: #f2f2f2;
}

.person-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>