<template>
  <div v-if="!loading" class="entreprise">
    <div class="header">
      <h1>Entreprise</h1>
      <p>
        Éditez les informations relatives à votre entreprise afin de garder vos
        documents à jour
      </p>
    </div>
    <div class="content">
      <form @submit.prevent="send">
        <div class="form-group-labels group-3">
          <div>
            <label>Nom de l'entreprise</label>
            <input
              placeholder="Nom de l'entreprise"
              v-model="currentEntreprise.nom"
              type="text"
            />
          </div>
          <div>
            <label>SIRET</label>
            <input
              placeholder="SIRET"
              v-model="currentEntreprise.siret"
              type="text"
            />
          </div>
          <div>
            <label>Téléphone</label>
            <input
              placeholder="Téléphone"
              v-model="currentEntreprise.telephone"
              type="text"
            />
          </div>
        </div>
        <div class="form-group-labels group-3">
          <div>
            <label>Voie</label>
            <input
              placeholder="Voie"
              v-model="currentEntreprise.adresse.voie"
              type="text"
            />
          </div>
          <div>
            <label>Code postal</label>
            <input
              v-model="currentEntreprise.adresse.codePostal"
              placeholder="Code postal"
              type="text"
            />
          </div>
          <div>
            <label>Ville</label>
            <input
              v-model="currentEntreprise.adresse.ville"
              placeholder="Ville"
              type="text"
            />
          </div>
        </div>
        <div class="form-group-labels group-1">
          <label>Mail de contact client</label>
          <input
            v-model="currentEntreprise.mailClient"
            type="text"
            placeholder="Mail de contact client"
          />
        </div>
        <div class="form-group-labels group-3">
          <div>
            <label>Banque</label>
            <input
              v-model="currentEntreprise.rib.banque"
              placeholder="Banque"
              type="text"
            />
          </div>
          <div>
            <label>IBAN</label>
            <input
              v-model="currentEntreprise.rib.iban"
              placeholder="IBAN"
              type="text"
            />
          </div>
          <div>
            <label>BIC</label>
            <input
              v-model="currentEntreprise.rib.bic"
              placeholder="BIC"
              type="text"
            />
          </div>
        </div>
        <img v-show="imageSRC" class="preview" :src="imageSRC" alt="Aperçu" />
        <img
          v-show="!imageSRC"
          class="preview"
          :src="entrepriseLogo"
          alt="Logo"
        />
        <div class="form-group-labels group-1">
          <FileInput
            v-model="file"
            type="image"
            @preview_change="handleImage"
            label="Logo de l'entreprise"
          />
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FileInput from '@/components/utils/FileInput'
export default {
  components: {
    FileInput
  },
  data() {
    return {
      loading: true,
      file: null,
      imageSRC: null
    }
  },
  computed: {
    ...mapGetters('Entreprise', ['currentEntreprise', 'entrepriseLogo'])
  },
  async created() {
    await this.getCurrentEntreprise()
    await this.getLogo()
    this.loading = false
  },
  methods: {
    ...mapActions('Entreprise', [
      'getCurrentEntreprise',
      'updateEntreprise',
      'getLogo'
    ]),
    async send() {
      const data = {
        ...this.currentEntreprise,
        img: this.file[0]
      }
      await this.updateEntreprise(data)
      this.$toasted.show('Modifications enregistrées', {
        theme: 'toasted-success',
        position: 'top-center',
        duration: 5000
      })
    },
    handleImage(e) {
      this.imageSRC = e
    }
  }
}
</script>
