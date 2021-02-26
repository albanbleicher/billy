import Devis from './App_Devis'
const route = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/App/Home.vue'),
    meta: {
      title: 'Tableau de bord'
    }
  },
  {
    path: 'entreprise',
    name: 'Entreprise',
    component: () =>
      import(
        /* webpackChunkName: "Entreprise_Home" */ '@/views/App/Entreprise.vue'
      ),
    meta: {
      title: 'Mon entreprise'
    }
  },
  {
    path: 'devis',
    name: 'Devis',
    component: () =>
      import(/* webpackChunkName: "Devis" */ '@/views/App/Devis/Layout.vue'),
    children: Devis,
    meta: {
      title: 'Mon entreprise'
    }
  },
  {
    path: 'produits-prestations',
    name: 'produits_prestations',
    component: () =>
      import(
        /* webpackChunkName: "Devis" */ '@/views/App/ProduitsPrestations.vue'
      ),
    meta: {
      title: 'Produits & prestations'
    }
  }
]

export default route
