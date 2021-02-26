<template>
  <div class="produits-prestations">
    <div class="header">
      <h1>Produits & prestations</h1>
      <p>Maintenez vos prix à jour, importez de nouveaux éléments...</p>
    </div>
    <div class="content">
      <input
        type="text"
        placeholder="Rechercher un produit ou une prestation..."
      />
      <div class="tabs">
        <div class="tabs-header">
          <div
            @click="currentTab = 0"
            :class="currentTab === 0 ? 'tab-header active' : 'tab-header'"
          >
            <span>Produits</span>
          </div>
          <div
            @click="currentTab = 1"
            :class="currentTab === 1 ? 'tab-header active' : 'tab-header'"
          >
            <span>Prestations</span>
          </div>
        </div>
        <div class="tabs-content">
          <transition name="fade" mode="out-in">
            <div v-if="currentTab === 0" :key="0" class="tab-element">
              <BillyTable :headers="headers" :items="items">
                <template slot="edit">
                  <button class="secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-edit"
                    >
                      <path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      ></path>
                      <path
                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      ></path>
                    </svg>
                    Éditer
                  </button>
                </template>
                <template slot="delete">
                  <button class="danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-trash-2"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      ></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Supprimer
                  </button>
                </template>
              </BillyTable>
            </div>
            <div v-if="currentTab === 1" :key="1" class="tab-element">
              <h1>prestations</h1>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BillyTable from '@/components/BillyTable'
export default {
  components: {
    BillyTable
  },
  data() {
    return {
      currentTab: 0,
      headers: [
        { title: 'Référence', name: 'ref' },
        { title: 'Intitulé', name: 'intitule' },
        { title: 'Tarif unitaire HT', name: 'tarif_unitaire_ht' },
        { title: 'TVA', name: 'taux_tva' },
        { title: 'Éditer', name: 'edit' },
        { title: 'Supprimer', name: 'delete' }
      ],
      items: [
        {
          ref: '1234',
          nom: 'Bleicher',
          prenom: 'Alban'
        },
        { nom: 'Assié', prenom: 'Louis' }
      ]
    }
  }
}
</script>
