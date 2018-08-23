<template>
  <img :src="src" :alt="alt" :class="klass">
</template>

<script>
export default {
  props: {
    alt: {
      type: String
    },
    klass: {
      type: String
    },
    src: {
      type: String,
      required: true
    }
  }
}
</script>
