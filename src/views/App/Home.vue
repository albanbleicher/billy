<template>
  <div v-if='!loading' class="app_home">
    <div class="header">
      <h1>Hello {{ userData.prenom }}</h1>
      <p>Bienvenue sur votre espace d'administration</p>
    </div>
    <div class="stats">
      <div class="stats-block">
        <span>{{ new Date() | moment("dddd Do MMMM  YYYY") }}</span>
      </div>
      <div class="stats-block">
        <span><span class="value">34</span> clients</span>
      </div>
      <div class="stats-block">
        <span><span class="value">28</span> devis</span>
      </div>
      <div class="stats-block">
        <span><span class="value">7</span> factures</span>
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
      loading:true
    }
  },
  computed: {
    ...mapGetters('Auth', ['currentUserId', 'userData'])
  },
  async created() {
    await this.getUserData(this.currentUserId)
    this.loading=false;
  },
  methods: {
    ...mapActions('Auth', ['getUserData', 'logout'])
  }
}
</script>
