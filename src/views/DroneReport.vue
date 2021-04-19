<template>
  <div class="drone-report-wrapper">
    <div class="heading">
      <div class="container">
        <h1>Drone Report</h1>
      </div>
    </div>
    <div class="container">
      <div class="drone-report-heading">
        <h1>{{ item.name }}</h1>
        <img :src="item.image" alt="" />
      </div>
      <table class="table">
        <thead>
          <th scope="col">Time</th>
          <th scope="col">Speed</th>
          <th scope="col">Latitude</th>
          <th scope="col">Longitude</th>
          <th scope="col">Traffic</th>
        </thead>
        <tbody>
          <tr v-for="d in item.data" :key="d.id">
            <td>
              {{
                new Date(d.time).toLocaleString("en-EU", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              }}
            </td>
            <td>{{ d.speed }}</td>
            <td>{{ d.latitude }}</td>
            <td>{{ d.longitude }}</td>
            <td :class="'traffic--mark traffic--mark-' + d.traffic_conditions">
              <span>{{ d.traffic_conditions }}</span>
            </td>
          </tr>
        </tbody>
      </table>
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
      time: null,
    };
  },
  computed: {},
  mounted() {
    this.axios
      .all([this.axios.get('/data.json'), this.axios.get('/drones.json')])
      .then(
        this.axios.spread((res1, res2) => {
          // console.log(res1, res2);
          this.data = res1.data.reports;
          this.drones = res2.data.drones;

          const Arr = [];
          this.data.forEach((element) => {
            if (element.drone_id === Math.floor(this.$route.params.id)) {
              this.drones.forEach((el) => {
                if (el.id === element.drone_id) {
                  Arr.push(element);
                  this.item = { name: el.name, image: el.image, data: Arr };
                }
              });
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
  h1 {
    font-size: 20px;
    text-transform: uppercase;
    text-align: left;
    font-weight: 800;
    color: $purple;
  }
  img {
    max-height: 45px;
    border-radius: 5px;
    margin-left: 20px;
  }
}
.table {
  background-color: $white;
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
      &-MODERATE {
        span {
          border-color: rgba(#f3bb1c, 100%);
          background-color: rgba(#f3bb1c, 0.2);
          color: #f3bb1c;
        }
      }
      &-LIGHT {
        span {
          border-color: rgba(#3CC13B, 100%);
          background-color: rgba(#3CC13B, 0.2);
          color: #3CC13B;
        }
      }
      &-HEAVY {
        span {
          border-color: rgba(#f03738, 100%);
          background-color: rgba(#f03738, 0.2);
          color: #f03738;
        }
      }
    }
  }
}
</style>
