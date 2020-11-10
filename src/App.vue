<template lang="pug">
	#app
		header.header
			.container
				.row
					.col.text-center
						router-link(to="/")
							img.logo(src="./assets/logo.png")
		main.main
			Loading
			transition(name="fade" mode="out-in")
				router-view
		footer.footer
</template>

<script>
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    Loading
  }
}
</script>

<style src='../node_modules/bootstrap/dist/css/bootstrap.css' ></style>
<style src='../node_modules/bootstrap-vue/dist/bootstrap-vue.css' ></style>
<style src="@/sass/components/main.sass" lang="sass"></style>
<style src="@/sass/components/loading.sass" lang="sass"></style>
<style src="@/sass/components/catalog.sass" lang="sass"></style>

