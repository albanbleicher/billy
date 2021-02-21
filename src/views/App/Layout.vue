<template>
  <div class="billy_app">
    <div class="nav">
      <ul>
        <li><router-link class="link" to="/app/">Accueil</router-link></li>
        <li>
          <router-link class="link" to="app/clients">Clients</router-link>
        </li>
        <li><router-link class="link" to="app/devis">Devis</router-link></li>
        <li>
          <router-link class="link" to="app/factures">Factures</router-link>
        </li>
        <li>
          <div class="dropdown">
          <svg @click='dropdown = !dropdown' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
            <ul :class='dropdown ? "collapse" : "collapse hidden"'>
              <li><router-link to='/app/entreprise'>Entreprise</router-link></li>
              <li><router-link to='/app/account'>Mon compte</router-link></li>
              <li><a @click="logout">Déconnexion</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <button class="create-button">+</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      dropdown:false
    }
  },
  methods:{
    ...mapActions('Auth', ['logout'])
  }
}
</script>
