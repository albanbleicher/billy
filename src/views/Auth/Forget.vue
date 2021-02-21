<template>
  <div class="auth login">
    <h1>Un oubli ? 🤔</h1>
    <form>
      <input type="email" v-model="identity.mail" placeholder="Mail" />
      <button type="button" @click="send">
        M'envoyer un mail de réinitialisation
      </button>
    </form>
  </div>
</template>
<script>
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
    send() {
      console.log('ok')
    }
  }
}
</script>
