<template>
  <div class="header">
    <div class="nav_wrap">
      <div class="address" @click="showCities = !showCities">
        <span class="addr">{{ address }}</span>
        <i class="el-icon-arrow-down icon_addr" v-if="!showCities"></i>
        <i class="el-icon-arrow-up icon_addr" v-else></i>
      </div>
      <p class="title">随心记</p>
      <router-link to="home" class="el-icon-house icon_home"></router-link>
    </div>

    <section>
      <ul class="cities" v-if="showCities">
        <li 
          v-for="(item, index) of cities"
          class="item"
          :key="index"
          @click="changeCity(index)"
        >
          {{ item }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      showCities: false
    }
  },
  computed: {
    address: {
      get: function () {
        return this.$store.state.address
      },
      set: function (val) {
        this.$store.state.address = val
      }
    },
    cities () {
      return this.$store.state.cities
    },
    ...mapMutations(['setAddress'])
  },
  methods: {
    changeCity (index) {
      let addr = this.cities[index]
      this.$store.commit('setAddress', addr)
      this.showCities = !this.showCities
    }
  }
}
</script>

<style lang="scss">
@import '@/common/styles/scss/index.scss';

.header {
  background-color: $theme_blue;
  color: $white;
  .nav_wrap {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    height: 50px;
    border-bottom: $divider_white;
    .address {
      position: absolute;
      .addr {
        margin-right: -2px;
      }
    }
    .icon_home {
      font-size: 20px;
      position: absolute;
      right: 20px;
      color: white;
    }
    .icon_addr {
      font-size: 20px;
      color: white;
    }
    .title {
      flex-grow: 1;
      text-align: center;
      font-size: 22px;
    }
  }
  .cities {
    width: 100%;
    background-color: $gray;
    color: $black;
    padding: 10px;
    position: absolute;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .item {
      border: 1px solid black;
      margin: 10px;
      padding: 5px;
    }
  }
}
</style>
