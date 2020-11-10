<template lang="pug">
	.card-detail(v-show="showStatus")
		.container
			.row
				.col-12
					.row.align-items-center
						.col
							h2 {{activeCardData.name}}
						.col.text-right
							router-link(to="/").btn.btn-sm.btn-success Back to List
			hr
			.row
				.col-6
					b-list-group(v-for="item in propsShow" :key="item.key")
						template(v-if="activeCardData[item.key]")
							b-list-group-item.list-group-item-info
								span {{item.name}}
								strong {{activeCardData[item.key]}}
				.col-6
					h4 Films
					template(v-if="activeCardData.films")
						template(v-for="key in activeCardData.films")
							b-badge.card-films(variant="info" :key="getStarshipsNumber(key)") {{films[getStarshipsNumber(key)]}}
</template>
<script>
	export default {
		mounted() {
			this.showStatus = false;
			this.$store.commit('FILMS_ARRAY', []);

			this.$store.dispatch('SHOW_LOADING');
			this.$store.commit('ACTIVE_CARD_ID', this.$route.params.pathMatch);			
			
			this.$store.dispatch('PEOPLES')
			.then((response) => {
				this.$store.commit('ACTIVE_CARD_DATA', response.data);

				let arrFilms = [];
				response.data.films.forEach((e) => {
					arrFilms.push({key: this.getStarshipsNumber(e), value : e});
				});

				this.$store.commit('FILMS_ARRAY', arrFilms);
				this.$store.dispatch('FILMS')
				.then(() => {
					this.showStatus = true;
					this.$store.dispatch('HIDE_LOADING');
				})
				.catch(() => {
					this.showStatus = true;
					this.$store.dispatch('HIDE_LOADING');
				});
			})
		},
		data() {
			return {
				showStatus: false,
				notFilmsMsg: "Not films :(",
				propsShow: [{
					key: "birth_year",
					name: "Birth Year: "
				},{
					key: "gender",
					name: "Gender: "
				},{
					key: "height",
					name: "Height: "
				},{
					key: "mass",
					name: "Mass: "
				},{
					key: "hair_color",
					name: "Hair Color: "
				},{
					key: "skin_color",
					name: "Skin Color: "
				},{
					key: "eye_color",
					name: "Eye Color: "
				}]
			}
		},
		methods: {
			getStarshipsNumber(str) {
				str = str.replace(/\/$/, '');
				str = str.split('/');
				return str[str.length - 1];
			}
		},
		computed: {
			activeCardData() {
				return this.$store.state.Catalog.activeCardData;
			},
			films() {
				return this.$store.state.Catalog.films;
			}
		}
	}
</script>