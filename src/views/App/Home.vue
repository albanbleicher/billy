<template>
  <div v-if="!loading" class="app_home">
    <div class="header">
      <h1>Hello {{ currentUser.prenom }}</h1>
      <p>Bienvenue sur votre espace d'administration</p>
    </div>
    <div class="stats">
      <div class="stats-block">
        <span>{{ new Date() | moment('dddd Do MMMM  YYYY') }}</span>
      </div>
      <div class="stats-block">
        <span
          ><span class="value">{{ clients }}</span> clients</span
        >
      </div>
      <div class="stats-block">
        <span
          ><span class="value">{{ devis }}</span> devis</span
        >
      </div>
      <div class="stats-block">
        <span
          ><span class="value">{{ factures }}</span> factures</span
        >
      </div>
    </div>
    <div class="recents">
      <h2>Récents</h2>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      modal: false
    }
  },
  computed: {
    ...mapGetters('Auth', ['currentUser']),
    ...mapGetters('Stats', ['devis', 'factures', 'clients'])
  },
  mounted() {
    this.getStats()
    this.loading = false
    setTimeout(() => {
      this.modal = true
    }, 2000)
  },
  methods: {
    ...mapActions('Auth', ['logout']),
    ...mapActions('Stats', ['getStats'])
  }
}
</script>
