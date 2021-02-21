<template>
  <div class="auth login">
    <h1>Vous revoilà! ☀️</h1>

    <form @submit.prevent="send">
      <input type="email" v-model="identity.mail" placeholder="Mail" />
      <input
        type="password"
        v-model="identity.password"
        placeholder="Mot de passe"
      />
      <button type="submit">Connexion</button>
    </form>
    <router-link class="link" to="/auth/forget"
      >Mot de passe oublié</router-link
    >
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      identity: {
        mail: null,
        password: null,
        remember: null
      }
    }
  },

  methods: {
    ...mapActions('Auth', ['login', 'logout']),
    send() {
      this.login(this.identity)
    }
  }
}
</script>
