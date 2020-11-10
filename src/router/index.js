import Vue from 'vue'
import Catalog from '@/components/Catalog.vue'
import Card from '@/components/Card.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'catalog',
		component: Catalog
	},
	{
		path: '/card/*',
		name: 'card',
		component: Card
	},
	{ 
		path: '*', 
		redirect: '/404' 
	}]
});

export default router; 