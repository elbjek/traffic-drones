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
          class="button--action button--action-purple"
          :to="{ path: '/'}">
            Back
          </router-link>
      </div>
    <div style="overflow-x:auto;min-height:60vh">
      <Loader v-if="loading"/>
      <table class="table" v-if="!loading">
        <thead>
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
<style lang="scss" scoped>
.error-block {
  td {
    text-align: center !important;
    text-transform: none !important;
    opacity: 0.7;
  }
}
.drone-report-wrapper {
  padding-bottom: 35px;
  border-bottom:2px dashed $red;
}
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
    margin-top:0
  }

  .img-placeholder {
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
  width:100%;
  display:table;
  border-collapse:collapse;
  thead{
    th {
    padding:20px 14px 8px 14px;
    opacity: 0.7;
    cursor:pointer;
    }
  }

  thead,
  tbody tr {
    border-bottom: 1px solid #f4f4f4;
  }

  th,
  td {
    border-bottom: none !important;
    border-top: none !important;
    text-align: left;
    font-family: "Lato", "sans-serif";
    display:table-cell;
  }

  tbody {
    tr {
      border-top: 1px solid #f4f4f4;
      transition: .2s ease-in-out;
      &:hover {
        background-color: #F6F9FC;
        cursor:pointer;
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
  }
}
</style>
