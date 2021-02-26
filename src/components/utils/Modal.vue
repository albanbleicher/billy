<template>
  <div class="modal_wrapper">
    <transition name="zoom" mode="out-in">
      <div v-if="openModal" class="modal">
        <div class="modal-header">
          <h1>{{ title }}</h1>
          <svg
            @click="handleClose"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div class="modal-content">
          <slot name="content" />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Titre de la modale'
    }
  },
  data() {
    return {
      openModal: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.openModal = true
    }, 100)
  },
  methods: {
    handleClose() {
      this.openModal = false
      setTimeout(() => {
        this.$emit('close')
      }, 100)
    },
    handleSubmit() {
      this.$emit('submit')
      this.handleClose()
    }
  }
}
</script>
