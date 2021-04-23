<template>
  <div class="drone-report-wrapper">
    <Heading title="Drone Report"/>
    <div class="container">
      <div class="drone-report-heading">
        <h2>{{ item.name }}</h2>
        <div class="img-placeholder">
          <img v-if="item.image" :src="item.image" alt="Image alt description" />
        </div>
        <router-link
          class="button-action button-action-purple"
          :to="{ path: '/'}">
            Back
          </router-link>
      </div>
    <div style="overflow-x:auto;min-height:60vh">
      <Loader v-if="loading"/>
      <table class="table" v-if="!loading">
        <thead>
          <th>ID</th>
            <th @click="sortBy( 'time')">
              Time
            </th>
            <th @click="sortBy('speed')">Speed</th>
            <th @click="sortBy('latitude')">Latitude</th>
            <th @click="sortBy('longitude')">Longitude</th>
            <th >Traffic</th>
        </thead>
        <tbody  v-if="sortedItems">
          <tr
            v-for="item in sortedItems"
            :key="item.id"
          >
          <td>{{item.id}}</td>
            <td>{{
              new Date(item.time).toLocaleString([], {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })
              }}</td>
            <td>{{ item.speed }}</td>
            <td>{{ item.latitude }}</td>
            <td>{{ item.longitude }}</td>
            <td :class="'traffic--mark traffic--mark-' + item.traffic_conditions">
                <span>{{ item.traffic_conditions }}</span>
            </td>
          </tr>
        </tbody>
        <tbody class="error-block"  v-else>
          <tr>
            <td colspan="6" id="error-block">No data to display</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-nested-ternary */
import Loader from '../components/Loader.vue';
import Heading from '../components/Heading.vue';

export default {
  name: 'Home',
  components: {
    Loader,
    Heading,
  },
  data() {
    return {
      item: {},
      reports: [],
      drones: [],
      sortKey: '',
      isAsc: false,
      loading: true,
      isSorted: false,
    };
  },
  computed: {
    sortedItems() {
      const list = this.item.reports;
      if (this.sortKey) {
        list.sort((a, b) => {
          const x = a[this.sortKey];
          const y = b[this.sortKey];
          return (x === y ? 0 : x > y ? 1 : -1) * (this.isAsc ? 1 : -1);
        });
      }
      return list;
    },
  },
  methods: {
    sortItems() {
      this.isSorted = !this.isSorted;
    },
    sortBy(key) {
      this.isAsc = this.sortKey === key ? !this.isAsc : false;
      this.sortKey = key;
    },
  },

  mounted() {
    const reports = [];
    this.axios
      .all([this.axios.get('/data.json'), this.axios.get('/drones.json')],
        {
          headers: { crossDomain: true },
        })
      .then(
        this.axios.spread((res1, res2) => {
          const allReports = res1.data.reports;
          const allDrones = res2.data.drones;
          this.loading = false;
          allDrones.forEach((drone) => {
            allReports.forEach((report) => {
              if (drone.id === Math.floor(this.$route.params.id) && drone.id === report.drone_id) {
                reports.push(report);
                this.item = { name: drone.name, image: drone.image, reports };
              }
            });
          });
        }),
      )
      .catch(() => {
        document.getElementById('error-block').innerHTML = 'Something went wrong!';
      });
  },
};
</script>
