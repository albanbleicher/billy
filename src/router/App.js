const route = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/App/Home.vue'),
    meta: {
      title: 'Tableau de bord'
    }
  }
]

export default route
