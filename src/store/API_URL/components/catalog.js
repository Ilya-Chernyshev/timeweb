import {BASE_URL} from '../BASE/BASE_URL.js'
export const catalog = {
	people : {
		path: `${BASE_URL}people/`,
		method: 'GET',
		params: {
			page: 'page'
		}
	},
	starships : {
		path: `${BASE_URL}starships/`,
		method: 'GET'
	},
	films : {
		path: `${BASE_URL}films/`,
		method: 'GET'
	}
};