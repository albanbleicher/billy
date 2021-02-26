<template>
  <Modal @close="$emit('close')" v-if="open" :open="open" title="Client">
    <template v-slot:content>
      <form ref="form">
        <div class="form-group-labels group-3">
          <div>
            <label>Civilité</label>
            <div class="select">
              <select v-model="client.civilite">
                <option value="">Civilité</option>
                <option value="m">M.</option>
                <option value="mme">Mme.</option>
                <option value="m_mme">Mme./M.</option>
              </select>
            </div>
          </div>
          <div>
            <label>Nom</label>
            <input v-model="client.nom" type="text" placeholder="Nom" />
          </div>
          <div>
            <label>Prénom</label>
            <input v-model="client.prenom" type="text" placeholder="Prénom" />
          </div>
        </div>

        <div class="form-group-labels group-1">
          <label>Voie</label>
          <input v-model="client.adresse.voie" type="text" placeholder="Voie" />
        </div>
        <div class="form-group-labels group-2">
          <div>
            <label>Code postal</label>
            <input
              v-model="client.adresse.codePostal"
              type="text"
              placeholder="Code postal"
            />
          </div>
          <div>
            <label>Ville</label>
            <input
              v-model="client.adresse.ville"
              type="text"
              placeholder="Ville"
            />
          </div>
        </div>
        <div class="form-group-labels group-2">
          <div>
            <label>Mail</label>
            <input v-model="client.mail" type="email" placeholder="Mail" />
          </div>
          <div>
            <label>Téléphone</label>
            <input
              v-model="client.telephone"
              type="text"
              placeholder="Téléphone"
            />
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button @click="handleSubmit">Valider</button>
    </template>
  </Modal>
</template>
<script>
import Modal from '@/components/utils/Modal'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Modal
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      client: {
        entreprise: '',
        civilite: '',
        nom: '',
        prenom: '',
        mail: '',
        telephone: '',
        adresse: {
          voie: '',
          codePostal: '',
          ville: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters('Auth', ['currentUser'])
  },
  mounted() {
    this.client.entreprise = this.currentUser.entreprise
  },
  methods: {
    ...mapActions('Clients', ['registerClient']),
    handleSubmit() {
      this.send()
    },
    async send() {
      if (
        this.client.civilite === '' ||
        this.client.nom === '' ||
        this.client.prenom === '' ||
        this.client.adresse.voie === '' ||
        this.client.codePostal === '' ||
        this.client.adresse.ville === '' ||
        this.client.mail === '' ||
        this.client.adresse.telephone === ''
      ) {
        this.$toasted.show('Merci de remplir tous les champs', {
          theme: 'toasted-error',
          position: 'top-center',
          duration: 5000
        })
      } else {
        const client = await this.registerClient(this.client)
        this.$emit('closeNewClient', client.id)
      }
    }
  }
}
</script>
