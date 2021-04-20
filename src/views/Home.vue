<template>
  <div class='drone-list'>
    <div class="heading">
      <div class="container">
        <h1>Drone List</h1>
      </div>
    </div>
    <div class='container'>
      <div class='row'>
        <div
          v-for='drone in drones'
          :key='drone.id'
          class='col-sm-12 col-md-6 col-lg-3'
        >
          <SingleItem :drone='drone' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleItem from '../components/SingleItem.vue';

export default {
  name: 'Home',
  components: {
    SingleItem,
  },
  data() {
    return {
      drones: [],
    };
  },
  mounted() {
    this.axios.get('drones.json').then((response) => {
      this.drones = response.data.drones;
    });
  },
};
</script>
