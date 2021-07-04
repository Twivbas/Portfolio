<template>
  <div class="home">
    <Header :navName="headerTitle"></Header>
    <router-view></router-view>
    <footer class="nav">
      <router-link
        v-for="(item, index) in navLists"
        :key="index"
        :to="item.path"
        :class="['nav_item', {checked: item.path === $route.path}]"
        @click.native="headerTitle = item.title"
      >
        <i :class="[item.icon, 'icon']"></i>
        <p class="nav_title">{{ item.title }}</p>
      </router-link>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Home',
  data () {
    return {
      headerTitle: '首页',
      navLists: [
        {
          title: '明细',
          path: '/detail',
          icon: 'el-icon-notebook-2'
        },
        {
          title: '记账',
          path: '/accounting',
          icon: 'el-icon-edit-outline'
        },
        {
          title: '统计',
          path: '/statistics',
          icon: 'el-icon-pie-chart'
        }
      ]
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import "@/common/styles/scss/index.scss";

.home {
  width: 100vw;
  height: 100vh;
  background-color: $gray;
  .nav {
    width: 100vw;
    height: 66px;
    background-color: $deep_gray;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 5px 0;
    display: flex;
    .nav_item {
      display: inline-block;
      flex-basis: 32%;
      text-align: center;
      color: $black;
      .icon {
        font-size: 32px;
      }
      .nav_title {
        padding-top: 5px;
        font-size: 16px;
      }
    }
    .checked {
      color: $theme_blue;
    }
  }
}
</style>
