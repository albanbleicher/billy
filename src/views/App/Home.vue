<template>
  <div class="app_home">
    <div class="header">
      <h1>Hello {{ userData.prenom }}</h1>
      <p>Bienvenue sur votre espace d'administration</p>
    </div>
    <div class="stats">
      <div class="stats-block">
        {{ Date.now() }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('Auth', ['currentUserId', 'userData'])
  },
  async created() {
    await this.getUserData(this.currentUserId)
  },
  methods: {
    ...mapActions('Auth', ['getUserData', 'logout'])
  }
}
</script>
