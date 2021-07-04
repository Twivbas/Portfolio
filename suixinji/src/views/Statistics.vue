<template>
  <div class="statistics">
    <header class="title">收支统计</header>
    <div class="message">
      <p>支出：<span class="cost">{{ expenseMoney }}</span>元</p>
      <p>收入：<span class="income">{{ incomeMoney }}</span>元</p>
    </div>
    <section class="echarts_part">
      <div id="echarts_pie" class="echarts" v-show="showPie"></div>
      <div id="echarts_bar" class="echarts" v-show="!showPie"></div>
    </section>
    <el-button class="toggle" v-if="showPie" @click="toggleEcharts">展示支出柱状图</el-button>
    <el-button class="toggle" v-else @click="toggleEcharts">展示饼图</el-button>
  </div>
</template>

<script>
let echarts = require('echarts')

export default {
  data () {
    return {
      expenseMoney: 0,
      incomeMoney: 0,
      showPie: true
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags
    },
    tallyData () {
      return this.$store.state.tallyData
    },
    costByTags () {
      // 根据tags数组产生一个统计相同标签支出之和的数组
      let arr = []
      for (let tag of this.tags.values()) {
        let sum = this.tallyData.reduce(
          (acc, curVal) => curVal.tag === tag && !curVal.type ? acc + (+curVal.price) : acc
          , 0)
        arr.push(sum)
      }
      return arr
    }
  },
  methods: {
    initEcharts () {
      let myChartPie = echarts.init(document.getElementById('echarts_pie'))
      let myChartBar = echarts.init(document.getElementById('echarts_bar'))
      // 饼图
      let optionPie= {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          data: ['支出', '收入']
        },
        series: [
          {
            name: '支出统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                value: this.expenseMoney,
                name: '支出',
                itemStyle: {
                  color: '#e13a3a'
                }
              },
              {
                value: this.incomeMoney,
                name: '收入',
                itemStyle: {
                  color: '#15db89'
                }
              }
            ]
          }
        ]
      }
      // 柱状图
      let optionBar = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        legend: {
          data: ['支出']
        },
        xAxis: {
          data: this.tags
        },
        yAxis: {},
        series: [{
          name: '支出',
          type: 'bar',
          data: this.costByTags
        }]
      }
      myChartPie.setOption(optionPie)
      myChartBar.setOption(optionBar)
    },
    initMoney () {
      this.tallyData.forEach(item => {
        if (item.type === 0) {
          this.expenseMoney += Number(item.price)
        } else {
          this.incomeMoney += Number(item.price)
        }
      })
    },
    toggleEcharts () {
      this.showPie = !this.showPie
    }
  },
  mounted () {
    this.initMoney()
    this.initEcharts()
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss/index.scss";
.statistics {
  .title {
    margin-bottom: 10px;
    padding: 18px;
    background-color: $theme_blue;
    color: $white;
  }
  .echarts_part {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .echarts {
      width: 250px;
      height: 250px;
    }
  }
  .message {
    margin-top: 20px;
    padding: 10px 30px;
    margin: 0;
    width: 100vw;
    color: $black;
    border-radius: 5px;
    >p {
      margin-bottom: 15px;
    }
    .cost {
      color: red;
    }
    .income {
      color: green;
    }
  }
  .toggle {
    display: block;
    margin: 20px auto 0;
    margin-top: 0;
  }
}
</style>
