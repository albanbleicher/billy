<template>
  <div class="auth register">
    <h1>Bonjour {{ identity.prenom ? identity.prenom : null }} 🌱</h1>

    <form>
      <transition name="fade" mode="out-in">
        <div v-if="errorMessage" class="alert-danger">
          {{ errorMessage }}
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="step === 1" class="form-step" :key="1">
          <div class="form-group group-2">
            <input type="text" v-model="identity.prenom" placeholder="Prénom" />
            <input type="text" v-model="identity.nom" placeholder="Nom" />
          </div>
          <div class="form-group group-2">
            <input type="email" v-model="identity.mail" placeholder="Mail" />
            <input type="email" v-model="mailConf" placeholder="Confirmation" />
          </div>
          <div class="form-group group-2">
            <input
              type="password"
              v-model="identity.password"
              placeholder="Mot de passe"
            />
            <input
              type="password"
              v-model="passwordConf"
              placeholder="Confirmation"
            />
          </div>
        </div>
        <div v-else-if="step === 2" class="form-step" :key="2">
          <div class="form-group group-3">
            <input type="text" v-model="entreprise.siret" placeholder="SIRET" />
            <input
              type="text"
              v-model="entreprise.nom"
              placeholder="Nom de l'entreprise"
            />
            <input
              type="text"
              v-model="entreprise.telephone"
              placeholder="Téléphone"
            />
          </div>
          <div class="form-group group-3">
            <input
              type="text"
              v-model="entreprise.adresse.voie"
              placeholder="Voie"
            />
            <input
              type="text"
              v-model="entreprise.adresse.codePostal"
              placeholder="Code postal"
            />
            <input
              type="text"
              v-model="entreprise.adresse.ville"
              placeholder="Ville"
            />
          </div>
          <input
            type="text"
            v-model="entreprise.mailClient"
            placeholder="Mail de contact client"
          />
        </div>
      </transition>
      <button type="button" @click="step === 1 ? checkIdentity() : send()">
        {{ step === 2 ? 'Valider' : 'Suivant' }}
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      errorMessage: '',
      identity: {
        prenom: '',
        nom: '',
        mail: '',
        password: ''
      },
      mailConf: '',
      passwordConf: '',
      step: 1,
      entreprise: {
        user: null,
        nom: '',
        siret: '',
        adresse: {
          voie: '',
          codePostal: '',
          ville: ''
        },
        rib: {
          banque: '',
          iban: '',
          bic: ''
        },
        telephone: '',
        contactClient: '',
        type: ''
      }
    }
  },
  methods: {
    ...mapActions('Auth', ['register']),
    checkIdentity() {
      if (
        this.identity.prenom === '' ||
        this.identity.prenom === '' ||
        this.identity.mail === '' ||
        this.mailConf === '' ||
        this.identity.password === '' ||
        this.passwordConf === ''
      ) {
        this.errorMessage = 'Merci de remplir tous les champs'
      } else {
        if (this.identity.mail != this.mailConf) {
          this.errorMessage = 'Les adresses mails ne sont pas identiques'
        } else {
          if (this.identity.password != this.passwordConf) {
            this.errorMessage = 'Les mots de passes ne sont pas identiques'
          } else {
            this.step = 2
            this.errorMessage = null
          }
        }
      }
    },
    send() {
      const data = {
        entreprise: this.entreprise,
        identity: this.identity
      }
      this.register(data)
    }
  }
}
</script>
