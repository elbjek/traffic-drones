<template>
  <div class='drone-list'>
    <Heading title="Drone Report"/>
    <div class='container drones-list-all'>
      <Loader v-if="loading"/>
      <div v-if="error" id="error-block">
        Something went wrong!
      </div>
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
import Loader from '../components/Loader.vue';
import Heading from '../components/Heading.vue';

export default {
  name: 'Home',
  components: {
    SingleItem,
    Loader,
    Heading,
  },
  data() {
    return {
      drones: [],
      loading: true,
      error: false,
    };
  },
  mounted() {
    this.axios.get('drones.json').then((response) => {
      this.loading = false;
      this.drones = response.data.drones;
      if (this.drones === undefined || this.drones === 0) {
        this.error = true;
      } else {
        this.error = false;
      }
    }).catch(() => {
      this.error = true;
    });
  },
};
</script>

<style lang="scss">
  .drones-list-all {
    min-height:50vh
  }
</style>
