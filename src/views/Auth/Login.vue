<template>
  <div class="auth login">
    <h1>Vous revoilà! ☀️</h1>
    <transition name="fade" mode="out-in">
      <div v-if="loginError" class="alert-danger">
        {{ loginError }}
      </div>
    </transition>
    <form ref="form" @submit.prevent="send">
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
import { mapGetters, mapActions } from 'vuex'
import gsap from 'gsap'
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
  computed: {
    ...mapGetters('Auth', ['loginError'])
  },
  watch: {
    loginError: {
      handler: function() {
        const timeline = gsap.timeline()
        timeline.to(this.$refs['form'], { x: -20, duration: 0.1 })
        timeline.to(this.$refs['form'], { x: 20, duration: 0.1 })
        timeline.to(this.$refs['form'], { x: -20, duration: 0.1 })
        timeline.to(this.$refs['form'], { x: 20, duration: 0.1 })
        timeline.to(this.$refs['form'], { x: -20, duration: 0.1 })
        timeline.to(this.$refs['form'], { x: 20, duration: 0.1 })
        timeline.to(this.$refs['form'], { x: 0, duration: 0.2 })
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
