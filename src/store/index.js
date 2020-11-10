import Vue  from 'vue';
import Loading from './modules/loading.js'
import Catalog from './modules/catalog.js'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	modules : {
		Catalog,
		Loading
	}
});