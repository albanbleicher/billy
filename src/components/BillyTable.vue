<template>
  <div class="billy-table">
    <table>
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="'header-' + i">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, j) in items" :key="'row-' + j">
          <td v-for="(item, k) in headers" :key="'row-' + j + 'item-' + k">
            {{ row[item.name] }}
            <slot :name="item.name" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => {
        return []
      }
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
