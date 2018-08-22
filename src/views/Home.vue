<template>
  <app-content :title="title">
    <ol class="breadcrumb" slot="breadcrumb">
      <li class="active"><i class="fa fa-home fa-fw"></i> {{ title }}</li>
    </ol>
  </app-content>
</template>

<script>
import AppContent from '@/components/AppContent'

export default {
  components: {
    AppContent
  },
  computed: {
    title () {
      return 'Beranda'
    }
  }
}
</script>
