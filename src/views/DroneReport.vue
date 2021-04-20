<template>
  <div class="drone-report-wrapper">
    <div class="heading">
      <div class="container">
        <h1>Drone Report</h1>
      </div>
    </div>
    <div class="container">
      <div class="drone-report-heading">
        <h2>{{ item.name }}</h2>
        <div class="img">
          <img v-if="item.image" :src="item.image" alt="" />
        </div>
        <router-link
          class="button--action button--action-purple"
          :to="{ path: '/'}">
            Back
          </router-link>
      </div>
      <table class="table">
        <thead>
          <th scope="col">Time</th>
          <th scope="col">Speed</th>
          <th scope="col">Latitude</th>
          <th scope="col">Longitude</th>
          <th scope="col">Traffic</th>
        </thead>
        <tbody v-if="item.data">
          <tr v-for="d in item.data" :key="d.id">
            <td v-on:click="sortByTime()">
              {{
                new Date(d.time).toLocaleString("en-EU", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              }}
            </td>
            <td v-on:click="sortBySpeed()">{{ d.speed }}</td>
            <td>{{ d.latitude }}</td>
            <td>{{ d.longitude }}</td>
            <td :class="'traffic--mark traffic--mark-' + d.traffic_conditions">
              <span>{{ d.traffic_conditions }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="" v-if="!isEmpty">No current data to display</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      item: {},
      data: [],
      drones: [],
      isEmpty: false,
    };
  },
  methods: {
    sortByTime() {
      this.item.data.sort((a, b) => new Date(b.time) - new Date(a.time));
    },
    sortBySpeed() {
      this.item.data.sort((a, b) => b.speed - a.speed);
    },
  },
  mounted() {
    this.axios
      .all([this.axios.get('/data.json'), this.axios.get('/drones.json')])
      .then(
        this.axios.spread((res1, res2) => {
          this.data = res1.data.reports;
          this.drones = res2.data.drones;
          const Arr = [];
          this.data.forEach((element) => {
            if (element.drone_id === Math.floor(this.$route.params.id)) {
              this.isEmpty = false;
              this.drones.forEach((el) => {
                console.log(el, element);
                if (el.id === element.drone_id) {
                  this.isEmpty = false;
                  Arr.push(element);
                  this.item = { name: el.name, image: el.image, data: Arr };
                }
              });
            } else {
              this.isEmpty = true;
            }
          });
        }),
      );
  },
};
</script>
<style lang="scss">
.drone-report-heading {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    text-transform: uppercase;
    text-align: left;
    font-weight: 900;
    color: $text--color-accent;
    margin-bottom:0;
  }

  .img {
    max-height: 45px;
    max-width: 80px;
    background-color: rgba(#212529, 0.2);
    margin-left: 20px;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      }
    }

  .button--action {
    padding-top:10px;
    padding-bottom: 10px;
    margin:auto 0 auto auto;
  }
}
.table {
  background-color: $background--color-white;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  th,
  td {
    border-bottom: none !important;
    border-top: none !important;
    text-align: left;
    font-family: "Lato", "sans-serif";
  }

  thead,
  tbody tr {
    border-bottom: 1px solid #f4f4f4;
  }
  tbody tr {
    border-top: 1px solid #f4f4f4;
  }
  thead th {
    padding-top: 20px;
    padding-bottom: 8px;
    opacity: 0.7;
  }
  tbody tr {
    transition: .2s ease-in-out;
    &:hover {
      background-color: #F6F9FC;
      cursor:pointer;
    }
  }

  td {
    padding: 14px !important;
    vertical-align: middle !important;

    @media screen and (max-width:768px) {
      padding:5px !important;
    }

    &:first-of-type {
      text-transform: lowercase;
    }

    &.traffic--mark {
      span {
        padding: 4px 8px 4px 8px;
        text-transform: lowercase;
        display: inline-block;
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
      }

      span:first-letter {
        text-transform: uppercase;
      }

      &-LIGHT {
        span {
          border-color: rgba($color--accent-light, 100%);
          background-color: rgba($color--accent-light, 0.2);
          color: $color--accent-light;
        }
      }
      &-MODERATE {
        span {
          border-color: rgba($color--accent-moderate, 100%);
          background-color: rgba($color--accent-moderate, 0.2);
          color: $color--accent-moderate;
        }
      }
      &-HEAVY {
        span {
          border-color: rgba($color--accent-heavy, 100%);
          background-color: rgba($color--accent-heavy, 0.2);
          color: $color--accent-heavy;
        }
      }
    }
  }
}
</style>
