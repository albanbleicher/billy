<template>
  <div class="autocomplete">
    <input
      ref="field"
      type="text"
      @input="handleChange"
      :placeholder="placeholder"
    />
    <div v-if="dropdown" class="dropdown">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="item"
        @click="handleEmit(item)"
      >
        <span>{{ item.search_label }}</span>
      </div>
      <div v-if="!items.length" class="item">
        <span>Votre recherche n'a retourné aucun résultat...</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Rechercher...'
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Object
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      dropdown: false,
      items: []
    }
  },
  methods: {
    handleEmit(e) {
      this.$refs['field'].value = e.search_label
      this.$emit('change', e)
      this.dropdown = false
    },
    handleChange(e) {
      const query = e.target.value.toLowerCase()
      if (query !== '') {
        this.dropdown = true
      } else {
        this.dropdown = false
      }
      this.items = this.data.filter(item =>
        item.search_values.toLowerCase().includes(query)
      )
    }
  }
}
</script>
