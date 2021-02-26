<template>
  <div @click="dropdown = false" class="billy_app">
    <div class="nav">
      <ul>
        <li><router-link class="link" to="/app/">Accueil</router-link></li>
        <li>
          <router-link class="link" to="app/clients">Clients</router-link>
        </li>
        <li><router-link class="link" to="/app/devis">Devis</router-link></li>
        <li>
          <router-link class="link" to="app/factures">Factures</router-link>
        </li>
        <li>
          <div class="dropdown">
            <svg
              @click.stop="handleDropdown"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-down"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <ul
              ref="dropdown"
              :class="dropdown ? 'collapse' : 'collapse hidden'"
            >
              <li>
                <router-link to="/app/produits-prestations"
                  >Produits & Prestations</router-link
                >
              </li>
              <li>
                <router-link to="/app/entreprise">Mon entreprise</router-link>
              </li>
              <li><router-link to="/app/account">Mon compte</router-link></li>
              <li><a @click="logout">Déconnexion</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade" mode="out-in">
      <router-view v-if="!loading" />
    </transition>
    <transition name="fade" mode="out-in">
      <Modal @close="modal = false" v-if="modal" :open="modal" title="Créer...">
        <template v-slot:content>
          <div class="modal-content-create">
            <router-link @click.native="modal = false" to="/app/devis/new"
              >Un nouveau devis</router-link
            >
            <router-link @click.native="modal = false" to="/app/factures/new"
              >Une nouvelle facture</router-link
            >
            <router-link @click.native="modal = false" to="/app/clients/new"
              >Enregister un nouveau client</router-link
            >
          </div>
        </template>
      </Modal>
    </transition>
    <button v-if="create" @click="modal = true" class="create-button">+</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Modal from '@/components/utils/Modal'
export default {
  components: {
    Modal
  },
  data() {
    return {
      dropdown: false,
      loading: true,
      modal: false,
      create: true
    }
  },
  async created() {
    await this.getCurrentUser()
    this.loading = false
  },
  mounted() {
    this.$refs['dropdown'].children.forEach(element => {
      element.addEventListener('click', this.handleDropdown)
    })
  },
  updated() {
    if (this.$route.fullPath === '/app/devis/new') {
      this.create = false
    } else {
      this.create = true
    }
  },
  methods: {
    ...mapActions('Auth', ['logout', 'getCurrentUser']),
    handleDropdown() {
      this.dropdown = !this.dropdown
    }
  }
}
</script>
