<template>
  <div>
    <section class="content-header">
      <h1 v-if="title">
        {{ title }}
        <small v-if="subtitle">{{ subtitle }}</small>
      </h1>

      <slot name="breadcrumb"></slot>
    </section>
    <section class="content">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  }
}
</script>
