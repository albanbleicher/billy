<template>
  <div class="file-input">
    <label>{{ label }}</label>
    <div @click="handleOpen" class="file-input-button secondary">
      <input
        :accept="type === 'image' ? 'image/*' : null"
        v-bind:files="value"
        @change="handleChange"
        ref="file"
        type="file"
        max="2000"
      />
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
        class="feather feather-upload-cloud"
      >
        <polyline points="16 16 12 12 8 16"></polyline>
        <line x1="12" y1="12" x2="12" y2="21"></line>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
        <polyline points="16 16 12 12 8 16"></polyline></svg
      ><span>Déposer un fichier</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Déposer un fichier'
    },
    value: {
      type: FileList,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    handleOpen() {
      this.$refs['file'].click()
    },
    handleChange(event) {
      const self = this
      const selectedFile = event.target.files[0]
      if (selectedFile.size > 2000000) {
        this.$toasted.show('Votre image doit être inférieure à 2Mo', {
          theme: 'toasted-error',
          position: 'top-center',
          duration: 5000
        })
      } else {
        self.$emit('change', event.target.files)
        const reader = new FileReader()
        reader.onload = function(event) {
          self.$emit('preview_change', event.target.result)
        }
        reader.readAsDataURL(selectedFile)
      }
    }
  }
}
</script>
