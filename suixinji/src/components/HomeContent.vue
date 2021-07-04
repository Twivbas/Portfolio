<template>
  <div class="home_content">
    <div class="content">
      <p class="date">
        {{ `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日` }}
      </p>
      <p class="tip">点击「记账」记一笔账吧(*^▽^*)</p>
    </div>

    <section class="weather_part">
      <ul class="weather">
        <li
          v-for="(item, index) of weather"
          class="weather_item"
          :key="index"
        >
          {{ item.day }}
          <span>{{ item.weather }}</span>
          <span>{{ item.celsius.substr(0, 3) }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      weather: ''
    }
  },
  computed: {
    ...mapState(['address'])
  },
  methods: {
    getWeather (address) {
      axios.get(`https://api.muxiaoguo.cn/api/tianqi?city=${address}&type=2`)
        .then(response => {
          console.log(response)
          this.weather = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getWeather(this.address)
  },
  watch: {
    address: function (newVal) {
      this.getWeather(newVal)
    }
  }
}
</script>

<style lang="scss">
@import "@/common/styles/scss/index.scss";

.home_content {
  .content {
    @include common_content;
    .date,
    .tip {
      text-align: center;
    }
    .date {
      padding: 30px 0;
      font-size: 35px;
      word-spacing: 0;
    }
    .tip {
      padding-bottom: 15px;
    }
  }
  .weather {
    height: calc(100vh - 292px);
    display: grid;
    grid-template-columns: repeat(1, 290px);
    grid-template-rows: repeat(7, 1fr);
    justify-content: center;
    align-items: center;
    .weather_item {
      display: flex;
      justify-content: space-between;
    }
    
  }
}
</style>
