import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import DroneReport from '../views/DroneReport.vue';

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
  {
    path: '/reports',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
