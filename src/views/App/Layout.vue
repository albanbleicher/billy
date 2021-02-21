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
      </ul>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <button class="create-button">+</button>
  </div>
</template>
