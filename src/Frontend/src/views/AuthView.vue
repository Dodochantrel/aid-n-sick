<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const isRegisterMode = ref(false); // Toggle between login and register modes
const router = useRouter();

// Data for login and registration
const registerData = ref({
  username: '',
  email: '',
  password: '',
});

const loginData = ref({
  username: '',
  password: '',
});

const errorMessage = ref('');
const successMessage = ref('');

// Computed properties for adaptive fields based on mode
const usernameField = computed({
  get: () => (isRegisterMode.value ? registerData.value.username : loginData.value.username),
  set: (value: string) => {
    if (isRegisterMode.value) {
      registerData.value.username = value;
    } else {
      loginData.value.username = value;
    }
  },
});

const passwordField = computed({
  get: () => (isRegisterMode.value ? registerData.value.password : loginData.value.password),
  set: (value: string) => {
    if (isRegisterMode.value) {
      registerData.value.password = value;
    } else {
      loginData.value.password = value;
    }
  },
});

// Computed ID values to avoid inline expressions in template
const usernameFieldId = computed(() => (isRegisterMode.value ? 'register-username' : 'login-username'));
const passwordFieldId = computed(() => (isRegisterMode.value ? 'register-password' : 'login-password'));

// Method to toggle between login and register modes
const toggleAuthMode = () => {
  isRegisterMode.value = !isRegisterMode.value;
  errorMessage.value = ''; // Clear error messages when switching modes
};

// Placeholder methods for handling login and registration
const handleLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await fetch('http://localhost:3000/auth/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData.value),
    });

    if (!response.ok) {
      // Si la réponse est incorrecte (erreur du serveur ou autre)
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Une erreur est survenue lors de la connexion';
      return;
    }

    // Si l'inscription est réussie
    successMessage.value = 'Connexion réussie !';
    loginData.value = { username: '', password: '' }; // Réinitialiser les champs
    router.push('/home');
  } catch (error) {
    // Si une erreur réseau ou autre se produit
    errorMessage.value = 'Une erreur réseau est survenue. Veuillez réessayer.';
    console.error(error);
  }

  console.log("Logging in with:", loginData.value);
};

const handleRegister = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await fetch('http://localhost:3000/auth/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData.value),
    });

    if (!response.ok) {
      // Si la réponse est incorrecte (erreur du serveur ou autre)
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Une erreur est survenue lors de l\'inscription';
      return;
    }

    // Si l'inscription est réussie
    successMessage.value = 'Inscription réussie !';
    registerData.value = { username: '', email: '', password: '' }; // Réinitialiser les champs
    toggleAuthMode();
  } catch (error) {
    // Si une erreur réseau ou autre se produit
    errorMessage.value = 'Une erreur réseau est survenue. Veuillez réessayer.';
    console.error(error);
  }
};
</script>

<template>
  <main class="auth-container">
    <h2>{{ isRegisterMode ? "Inscription" : "Connexion" }}</h2>

    <form @submit.prevent="isRegisterMode ? handleRegister() : handleLogin()">
      <!-- Username field for both login and registration -->
      <div class="form-group">
        <label :for="usernameFieldId">{{ isRegisterMode ? 'Nom d\'utilisateur' : 'Nom d\'utilisateur' }}</label>
        <input
          type="text"
          :id="usernameFieldId"
          v-model="usernameField"
          required
          placeholder="Entrez votre nom d'utilisateur"
        />
      </div>

      <!-- Email field for registration -->
      <div v-if="isRegisterMode" class="form-group">
        <label for="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          v-model="registerData.email"
          required
          placeholder="Entrez votre email"
        />
      </div>

      <!-- Password field -->
      <div class="form-group">
        <label :for="passwordFieldId">Mot de passe</label>
        <input
          :id="passwordFieldId"
          type="password"
          v-model="passwordField"
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <button type="submit">{{ isRegisterMode ? "S'inscrire" : "Se connecter" }}</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <p class="toggle" @click="toggleAuthMode">
      {{ isRegisterMode ? "Déjà un compte ? Connectez-vous" : "Pas de compte ? Inscrivez-vous" }}
    </p>
  </main>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #38a174;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.toggle {
  text-align: center;
  color: #42b983;
  cursor: pointer;
  margin-top: 15px;
}

.toggle:hover {
  color: #38a174;
}
</style>
