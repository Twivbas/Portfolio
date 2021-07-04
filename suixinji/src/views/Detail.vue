<template>
  <div class="detail">
    <header class="title">全部收支</header>
    <section class="lists_wrap" v-if="tallyData.length > 0">
      <ul>
        <li
          v-for="(item, index) in tallyData"
          :key="index"
          @click="removeItem(item)"
        >
          <el-row class="data_item">
            <el-col class="tag">{{ item.tag }}</el-col>
            <el-col class="remark">{{ item.remark }}</el-col>
            <el-col :class="['price', item.type === 0 ? 'expense' : 'income']">
              ￥{{ item.price }}
            </el-col>
            <el-col class="time">{{ changeFormat(item.createdTime) }}</el-col>
          </el-row>
        </li>
      </ul>
    </section>
    <section class="noData" v-else>暂无数据</section>
  </div>
</template>

<script>
export default {
  computed: {
    tallyData () {
      return this.$store.state.tallyData
    }
  },
  methods: {
    changeFormat (t) {
      return new Date(t).toLocaleString().replace(/\//g, '-')
    },
    removeItem (data) {
      if (confirm('是否要删除此条记录？')) {
        this.$store.commit('removeTallyData', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss/index.scss";
.detail {
  .title {
    margin-bottom: 20px;
    padding: 18px;
    background-color: $theme_blue;
    color: $white;
  }
  .lists_wrap {
    padding-bottom: 66px;
    .data_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 6px 8px;
      background-color: $white;
      border-radius: 5px;
      .remark {
        font-size: 14px;
        color: $black;
        opacity: 0.5;
      }
      .price {
        word-break: break-all;
      }
      .time {
        text-align: right;
        font-size: 12px;
        color: $black;
        opacity: 0.5;
      }
      .expense {
        color: red;
      }
      .income {
        color: green;
      }
    }
  }
  .noData {
    padding-left: 18px;
    font-size: 40px;
    opacity: 0.5;
  }
}
</style>
