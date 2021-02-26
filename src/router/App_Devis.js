const route = [
  {
    path: '/',
    name: 'devis_home',
    component: () =>
      import(/* webpackChunkName: "Devis_Home" */ '@/views/App/Devis/Home.vue'),
    meta: {
      title: 'Devis'
    }
  },
  {
    path: 'new',
    name: 'devis_new',
    component: () =>
      import(/* webpackChunkName: "Devis_New" */ '@/views/App/Devis/New.vue'),
    meta: {
      title: 'Nouveau devis'
    }
  }
]

export default route
