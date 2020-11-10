<template lang="pug">
	.container.card-pepople-container( v-if="showCatalog")
		.row
			template(v-for="item in peoplesArray")
				.card-pepople.col-6
					b-card(:title="item.name").alert.alert-info
						.row
							.col
								.prop-block
									span Gender: 
									strong {{item.gender}}
								.block-desc
									span Height: 
									strong {{item.height}}
								.block-desc
									span Mass: 
									strong {{item.mass}}
							.col
								strong Starships:
								.starships
									template(v-if="item.starships.length")
										template(v-for="key in item.starships")
											b-badge(variant="info") {{starshipsArray[getStarshipsNumber(key)]}}
									template(v-else)
										b-badge(variant="danger") {{notStarshipMsg}} 
						hr
						.text-right
							b-link(href="" @click="setCard(getStarshipsNumber(item.url))").btn.btn-info.btn-sm See more info Person


		b-pagination(:per-page="perPage" v-model="currentPageStore" :total-rows="countPageStore"  :limit="9" @change="pagination")
</template>
<script>
	export default {
		data() {
			return {
				notStarshipMsg: "I haven't starship (",
				showCatalog: false,
				perPage: 10, 
			}
		},
		mounted(){
			this.$store.commit('STARSHIPS_ARRAY', []);
			this.$store.dispatch('SHOW_LOADING');

			this.$store.dispatch('PEOPLE')
			.then(() => {
				let arrStarships = [];
				for (let i = 0; i < this.peoplesArray.length; i++) {
					this.peoplesArray[i].starships.forEach((e) => {
						arrStarships.push({key: this.getStarshipsNumber(e), value : e});
					});
				}
				this.$store.commit('STARSHIPS_ARRAY', arrStarships);
				this.$store.dispatch('STARSHIPS')
				.then(() => {
					this.showCatalog = true;
					this.$store.dispatch('HIDE_LOADING');
				})
				.catch(() => {
					this.showCatalog = true;
					this.$store.dispatch('HIDE_LOADING');
				});

			})
			.catch((resp) => {
				this.showError(null, "Unable to get a response from the server");
				console.log(resp);
			})
		},
		methods : {
			pagination(page) {
				this.$store.dispatch('SHOW_LOADING');
				this.showCatalog = false;

				if (this.currentPageStore != page) {
					this.$store.commit('CURRENT_PAGE_PEOPLE', page);
					this.$store.dispatch('PEOPLE')
					.then(() => {
						this.$store.dispatch('STARSHIPS')
						.then(() => {
							this.showCatalog = true;
							this.$store.dispatch('HIDE_LOADING');
						})
						.catch(() => {
							this.showCatalog = true;
							this.$store.dispatch('HIDE_LOADING');
						});
					})
					.catch((resp) => {
						this.showError(null, "Unable to get a response from the server");
						console.log(resp);
					})
				}
			},
			getStarshipsNumber(str) {
				str = str.replace(/\/$/, '');
				str = str.split('/');
				return str[str.length - 1];
			},
			setCard(id) {
				this.$router.push({ path: `/card/${id}`});
			},
			showError(title, error) {
				this.$bvModal.msgBoxOk(error, {
					title: title ? title : 'Error',
					size: 'sm',
					buttonSize: 'sm',
					okVariant: 'success',
					headerClass: 'p-2 border-bottom-0',
					footerClass: 'p-2 border-top-0',
					centered: true
				})
			}
		},
		computed: {
			currentPageStore : {
				get() {
					return this.$store.state.Catalog.currentPage;
				},
				set(page) {
					this.$store.commit('CURRENT_PAGE_PEOPLE', page);
				}
			},
			countPageStore() {
				return this.$store.state.Catalog.countPage;
			},
			peoplesArray() {
				return this.$store.state.Catalog.peoples;
			},
			starshipsArray() {
				return this.$store.state.Catalog.starships;
			}
		}
	}
</script>