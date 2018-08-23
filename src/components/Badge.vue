<template>
  <span :class="kelas">
    <slot></slot>
  </span>
</template>

<script>
export default {
  computed: {
    kelas () {
      return `badge bg-${this.color}`
    }
  },
  props: {
    color: {
      type: String,
      default: 'green'
    }
  }
}
</script>
