<template>
  <div class="card">
      <div class="img-placeholder" :style="{ backgroundImage: 'url(' + drone.image + ')' }"></div>
    <div class="card-body">
      <div class="card-info">
        <div class="card-titles">
          <p>Name:</p>
          <p>Battery:</p>
          <p>Age:</p>
        </div>
        <div class="card-data">
          <p>{{ drone.name }}</p>
          <p>{{ drone.battery }}mA</p>
          <p>{{ drone.age }} {{drone.age > 1 ? 'Years': 'Year'}}</p>
        </div>
      </div>
      <router-link
        class="button-action button-action-purple"
        :to="{ path: '/reports/' + drone.id }"
      >
        See Reports
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleItem',
  props: ['drone'],
};
</script>

<style lang="scss">

</style>
