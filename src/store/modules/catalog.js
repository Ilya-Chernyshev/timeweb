import {
	CURRENT_PAGE_PEOPLE,
	COUNT_PAGE_PEOPLE,
	PEOPLES_ARRAY,
	STARSHIPS_ARRAY,
	STARSHIPS,
	PEOPLES,
	ACTIVE_CARD_ID,
	ACTIVE_CARD_DATA,
	FILMS_ARRAY,
	FILMS,
	PEOPLE
} from "../actions/catalog";
import axios from 'axios'
import {URLS} from '../API_URL/'

const getParams = function(obj) {
	if (obj && JSON.stringify(obj) !== '{}') {
		let str = "";
		for (let key in obj) {
			if (str != "") {
				str += "&";
			}
			str += key + "=" + encodeURIComponent(obj[key]);
		}	
		return str;
	}
	return '';
};

const state = {
	peoples: [],
	currentPage: 1,
	countPage: 0,
	starships: {},
	films: {},
	activeCardID: null,
	activeCardData: {},
	filmsArr: [],
	starshipsArr: []
};

const actions = {
	[PEOPLE]: ({commit}) => {
		var getParamsStr = getParams({
			[URLS.catalog.people.params.page] : state.currentPage
		});
		commit(PEOPLES_ARRAY, []);

		return new Promise((resolve, reject) => {
			axios({url: `${URLS.catalog.people.path}?${getParamsStr}`,  method: URLS.catalog.people.method })
			.then((response) => {
				commit(COUNT_PAGE_PEOPLE, response.data.count);
				commit(PEOPLES_ARRAY, response.data.results);
				resolve(response);
			})
			.catch((req) => {
				reject(req);
			})
		})
	},
	[PEOPLES] : () => {
		return new Promise((resolve, reject) => {
			axios({url: `${URLS.catalog.people.path}${state.activeCardID}/`,  method: URLS.catalog.people.method })
			.then((response) => {
				resolve(response);
			})
			.catch((req) => {
				reject(req);
			})
		});
	},
	[STARSHIPS]: () => {
		const countLenght = state.starshipsArr.length;
		let count = 0;
		return new Promise((resolve, reject) => {

			if (state.starshipsArr.length) {				
				state.starshipsArr.forEach((e) => {
					new Promise((resolve, reject) => {
						axios({url: `${URLS.catalog.starships.path}${e.key}/`,  method: URLS.catalog.starships.method })
						.then((response) => {
							state.starships[e.key] = response.data.name;
							if (countLenght -1 === count) {
								resolve(state.starships);
							}
							count++;
						})
						.catch((req) => {
							reject(req);
						})
					})
					.then((response) => {
						resolve(response);
					})
					.catch((req) => {
						reject(req);
					})
				});
			}
			else {
				resolve([]);
			}
		});
	},
	[FILMS]: () => {
		const countLenght = state.filmsArr.length;
		let count = 0;
		return new Promise((resolve, reject) => {

			if (state.filmsArr.length) {				
				state.filmsArr.forEach((e) => {
					new Promise((resolve, reject) => {
						axios({url: `${URLS.catalog.films.path}${e.key}/`,  method: URLS.catalog.films.method })
						.then((response) => {
							state.films[e.key] = response.data.title;
							if (countLenght -1 === count) {
								resolve(state.films);
							}
							count++;
						})
						.catch((req) => {
							reject(req);
						})
					})
					.then((response) => {
						resolve(response);
					})
					.catch((req) => {
						reject(req);
					})
				});
			}
			else {
				resolve([]);
			}
		});
	}
};

const mutations = {
	[CURRENT_PAGE_PEOPLE]: (state, data) => {
		state.currentPage = data;
	},
	[COUNT_PAGE_PEOPLE]: (state, data) => {
		state.countPage = data;
	},
	[PEOPLES_ARRAY]: (state, data) => {
		state.peoples = data;
	},
	[STARSHIPS_ARRAY]: (state, data) => {
		state.starshipsArr = data;
	},
	[ACTIVE_CARD_ID]: (state, data) => {
		state.activeCardID = data;
	},
	[ACTIVE_CARD_DATA]: (state, data) => {
		state.activeCardData = data;
	},
	[FILMS_ARRAY]: (state, data) => {
		state.filmsArr = data;
	}
};

export default {
	state,
	mutations,
	actions
};