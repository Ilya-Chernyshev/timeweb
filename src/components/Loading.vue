<template lang="pug">
  .loading
    .bg-loading(:class="showLoading")
    b-spinner.big-spinner-grow.spinner-grow-main(variant="primary" :class="showLoading")
</template>

<script>
export default {
  name: 'Loading',
  computed : {
    showLoading() {
      if (this.$store.state.Loading.showLoading) {
        return "";
      }
      return "spiner-hide";
    }
  }
}
</script>
