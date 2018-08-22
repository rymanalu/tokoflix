<template>
  <footer class="main-footer">
    <div class="container">
      <strong>Copyright &copy; 2009-{{ year }} PT Tokopedia.</strong> All rights
      reserved.
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year () {
      return (new Date()).getFullYear()
    }
  }
}
</script>
