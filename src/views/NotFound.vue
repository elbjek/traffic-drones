<template>
  <div class="page-not-found">
      <Heading title="Traffic Drones"/>
      <div class="container">
        <h1>Page not found</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam beatae
           laboriosam iusto, officia eligendi tempora facilis. Vitae non libero
           rerum repudiandae est nesciunt eaque esse, obcaecati iure nihil ex
           neque.</p>
        <router-link :to="{ path: '/' }" class="button-action button-action-purple">
          Go to homepage
        </router-link>
      </div>
  </div>
</template>
<script>
import Heading from '../components/Heading.vue';

export default {
  name: 'NotFound',
  components: { Heading },
};
</script>

<style lang="scss" scoped>

</style>
