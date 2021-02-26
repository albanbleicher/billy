<template>
  <div class="devis_new">
    <div class="header">
      <h1>Nouveau devis</h1>
      <p>Créez rapidement un devis à présenter à votre client</p>
    </div>
    <div class="content">
      <div class="form-group-labels group-4">
        <div>
          <label>Référence</label>
          <input type="text" placeholder="Référence" />
        </div>
        <div>
          <label>Date</label>
          <date-picker class="picker" v-model="date">
            <template v-slot="{ inputValue, togglePopover }">
              <input
                :value="inputValue"
                readonly
                type="text"
                color="grey"
                @focus="togglePopover({ placement: 'bottom' })"
              />
            </template>
          </date-picker>
        </div>
        <div class="amount">
          <span>100€</span>
          <label>Total HT</label>
        </div>
        <div class="amount">
          <span>100€</span>
          <label>Total TTC</label>
        </div>
      </div>
      <div class="devis-editor">
        <div class="tabs">
          <div
            @click="step = 0"
            :class="step === 0 ? 'tab-header active' : 'tab-header'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Client</span>
          </div>
          <div
            @click="step = 1"
            :class="step === 1 ? 'tab-header active' : 'tab-header'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Produits & prestations</span>
          </div>
          <div
            @click="step = 2"
            :class="step === 2 ? 'tab-header active' : 'tab-header'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-check"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Finalisation</span>
          </div>
        </div>
        <div class="views">
          <transition name="fade" mode="out-in">
            <div v-if="step === 0" :key="0" class="view">
              <transition name="fade" mode="out-in">
                <div v-if="!client.nom" :key="1" class="search">
                  <Autocomplete
                    v-model="client"
                    placeholder="Rechercher un client..."
                    :data="clientsList"
                  />
                  <button @click="openModalClient = true">
                    Enregistrer un nouveau client
                  </button>
                </div>
                <div v-else class="clients_infos" :key="2">
                  <h2>
                    Informations client
                    <span>— <a @click="client = {}">Changer de client</a></span>
                  </h2>
                  <div class="infos-group">
                    <div class="info">
                      <label>Nom : </label><span>{{ client.nom }}</span>
                    </div>
                    <div class="info">
                      <label>Prenom : </label><span>{{ client.prenom }}</span>
                    </div>
                  </div>
                  <div class="infos-group">
                    <div class="info">
                      <label>Voie : </label
                      ><span>{{ client.adresse.voie }}</span>
                    </div>
                    <div class="info">
                      <label>Code postal : </label
                      ><span>{{ client.adresse.codePostal }}</span>
                    </div>
                    <div class="info">
                      <label>Ville : </label
                      ><span>{{ client.adresse.ville }}</span>
                    </div>
                  </div>
                  <div class="infos-group">
                    <div class="info">
                      <label>Mail : </label><span>{{ client.mail }}</span>
                    </div>
                    <div class="info">
                      <label>Téléphone : </label
                      ><span>{{ client.telephone }}</span>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div v-if="step === 1" :key="1" class="view">
              <BillyTable />
            </div>
            <div v-if="step === 2" :key="2" class="view">
              <h1>final</h1>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <button class="save-button">
      <img src="@/assets/icons/save.svg" alt="Enregistrer" />
    </button>
    <ModalClient
      :open="openModalClient"
      @close="openModalClient = false"
      @closeNewClient="handleCloseNewClient"
    />
  </div>
</template>
<script>
import styles from '@/assets/styles/utils/Variables.scss'
import ModalClient from '@/components/ModalClient.vue'
import { mapGetters, mapActions } from 'vuex'
import Autocomplete from '@/components/utils/Autocomplete.vue'
import BillyTable from '@/components/BillyTable'
export default {
  components: {
    ModalClient,
    Autocomplete,
    BillyTable
  },
  data() {
    return {
      date: Date.now(),
      style: [],
      masks: {
        input: 'YYYY-MM-DD h:mm A'
      },
      step: 1,
      openModalClient: false,
      client: {},
      data: [
        {
          id: 1,
          first_name: 'Jesse',
          last_name: 'Simmons',
          date: '2016-10-15 13:43:27',
          gender: 'Male'
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          date: '2016-12-15 06:00:53',
          gender: 'Male'
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          date: '2016-04-26 06:26:28',
          gender: 'Female'
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          date: '2016-04-10 10:28:46',
          gender: 'Male'
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          date: '2016-12-06 14:38:38',
          gender: 'Female'
        }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'First Name'
        },
        {
          field: 'last_name',
          label: 'Last Name'
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender'
        }
      ]
    }
  },
  async created() {
    this.style = styles
    await this.getClientsList()
    console.log(this.clientsList)
  },
  computed: {
    ...mapGetters('Clients', ['clientsList'])
  },
  methods: {
    ...mapActions('Clients', ['getClientsList', 'getClient']),
    handleCloseNewClient(client) {
      console.log(client)
      this.openModalClient = false
      this.$toasted.show('Le nouveau client à été enregistré', {
        theme: 'toasted-success',
        position: 'top-center',
        duration: 5000
      })
    }
  }
}
</script>
