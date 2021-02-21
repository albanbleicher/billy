<template>
  <div class="home">
    <div class="nav">
      <ul ref='nav'>
        <li>
          <router-link class="link" to="/auth/login">Connexion</router-link>
        </li>
        <li>
          <router-link class="colored" to="/auth/register"
            >Inscription</router-link
          >
        </li>
      </ul>
    </div>
    <h1 ref="title">Billy</h1>
    <p ref="sub">L'assitant malin pour les entreprises</p>
  </div>
</template>
<script>
import gsap from 'gsap'
export default {
  mounted() {
    const timeline = gsap.timeline();
    timeline.from(this.$refs['title'], {y:40, opacity:0, duration:0.5})
    timeline.from(this.$refs['sub'], {y:-40, opacity:0, duration:0.5})

    timeline.from(this.$refs['nav'].children, {y:-40, opacity:0, duration:1, ease:'back', stagger:0.5})
  }
}
</script>