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
        class="button--action button--action-purple"
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
.card {
  padding-bottom: 24px;
  margin-bottom: 12px;
  margin-top:12px;
  border-radius: 15px !important;
  border: none !important;
  box-shadow: 0px 7.896931171417236px 10.529241561889648px 0px #0000000A;

  .card-body {
    padding: 0 1.25rem;
  }

  .img-placeholder {
    min-height: 140px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #eaeaea;
    margin-bottom:24px;

    @media screen and (max-width:992px) {
      min-height:200px;
    }

    @media screen and (max-width:768px) {
      min-height:240px;
    }
  }

  .card-info {
    display: flex;
  }
  .card-titles, .card-data p p:first-child{
    text-transform: uppercase;
  }
  .card-titles,
  .card-data {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 900;
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .card-data {
    p:first-of-type {
      color:$text--color-accent;
      text-transform: uppercase;
    }
  }
  .button {
    margin-top: 16px;
  }
}
</style>
