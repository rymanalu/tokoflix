<template>
  <div class="wrapper">
    <app-header />

    <div class="content-wrapper">
      <div class="container">
        <router-view />
      </div>
    </div>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppHeader, AppFooter
  }
}
</script>
