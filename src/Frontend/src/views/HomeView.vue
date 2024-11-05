<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
import ThePersonList from '../components/ThePersonList.vue';

type Person = {
  nom: string;
  prenom: string;
  icon: string;
  ville: string;
  codePostal: string;
}

const personData: Person[] = [
  {
    nom: 'Dupont',
    prenom: 'Jean',
    icon: 'https://via.placeholder.com/50',
    ville: 'Paris',
    codePostal: '75001'
  },
  {
    nom: 'Martin',
    prenom: 'Claire',
    icon: 'https://via.placeholder.com/50',
    ville: 'Lyon',
    codePostal: '69002'
  },
  {
    nom: 'Durand',
    prenom: 'Émilie',
    icon: 'https://via.placeholder.com/50',
    ville: 'Marseille',
    codePostal: '13001'
  },
  {
    nom: 'Lefebvre',
    prenom: 'Lucas',
    icon: 'https://via.placeholder.com/50',
    ville: 'Toulouse',
    codePostal: '31000'
  },
  {
    nom: 'Moreau',
    prenom: 'Sophie',
    icon: 'https://via.placeholder.com/50',
    ville: 'Nice',
    codePostal: '06000'
  },
  {
    nom: 'Petit',
    prenom: 'Julien',
    icon: 'https://via.placeholder.com/50',
    ville: 'Bordeaux',
    codePostal: '33000'
  },
  {
    nom: 'Giraud',
    prenom: 'Isabelle',
    icon: 'https://via.placeholder.com/50',
    ville: 'Strasbourg',
    codePostal: '67000'
  }
];
</script>

<template>
  <TheHeader />
  <main>
    <ThePersonList :persons="personData" />
  </main>
  <TheFooter />
</template>
