<template>
  <label class="b-contain">
    <span>{{ label }}</span>
    <input @change="handle" type="checkbox" />
    <div class="b-input"></div>
  </label>
</template>
<script>
export default {
  props: ['label'],
  methods: {
    handle(e) {
      this.$emit('change', e.target.checked)
    }
  }
}
</script>
