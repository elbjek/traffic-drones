import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import DroneReport from '../views/DroneReport.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reports/:id',
    name: 'DroneReport',
    component: DroneReport,
    props: true,
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
