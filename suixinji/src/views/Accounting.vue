<template>
  <div class="accounting">
    <section class="type_wrap">
      <el-row class="type">
        <el-col 
          :class="['expense', { checked: type === 0 }]" 
          :span="12"
          @click.native="type = 0"
        >
          支出
        </el-col>
        <el-col 
          :class="['income', { checked: type === 1 }]" 
          :span="12"
          @click.native="type = 1"
        >
          收入
        </el-col>
      </el-row>
    </section>

    <section class="tags">
      <div class="tags_left">标签</div>
      <ul class="tags_right">
        <li v-for="(item, index) in tags" 
        :class="['tags_item', { checked: item === selectedTag }]" 
        :key="index"
        @click="selectedTag = item"
        >
          {{ item }}
        </li>
        <router-link to="/tags" class="tags_item">编辑</router-link>
      </ul>
      
    </section>

    <section class="main">
      <section class="input_wrap">
        <label for="remark" class="remark_wrap">
          <span class="remark">备注</span>
          <input type="text" v-model="remark" class="remarkInput" id="remark" placeholder="请输入备注">
        </label>
        <div class="price_wrap">
          <span class="title">金额</span>
          <p class="price">{{ price }}</p>
        </div>
      </section>

      <section class="calc_wrap">
        <ul class="calc">
          <li 
            :class="['calc_item', { confirm: item === '确认'}, { zero: item === 0 }]"
            v-for="(item, index) in calcData" 
            :key="index"
            @click="calcPrice(item)"
          >
            {{ item }}
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Accounting',
  data () {
    return {
      type: 0,
      price: 0,
      remark: '',
      remarkMaxLength: 10,
      selectedTag: this.$store.getters.getTags[0],
      tags: this.$store.getters.getTags,
      calcData: [1, 2, 3, '删除', 4, 5, 6, '清空', 7, 8, 9, '确认', 0, '.']
    }
  },
  methods: {
    calcPrice (val) {
      switch (val) {
        case '删除':
          if (this.price.length > 1) {
            this.price = this.price.slice(0, this.price.length - 1)
          } else {
            this.price = 0
          }
          break
        case '确认':
          this.submit()
          break
        case '清空':
          this.price = 0
          break
        case '.':
          if (!this.price.includes('.')) {
            this.price = `${this.price}${val}`
          }
          break
        default:
          if (Number(this.price) > 10000000) {
            this.price = this.price.slice(0, this.price.length - 1)
            this.$message.info('金额太大！')
          } else {
            this.price = this.price === 0 ? `${val}` : `${this.price}${val}`
          }
          break
      }
    },
    submit () {
      if (this.remark.trim() && Number(this.price)) {
        let createdTime = new Date().getTime()
        let tag = this.selectedTag
        let { type, price, remark } = this
        let data = { createdTime, type, price, remark, tag }
        this.$store.commit('setTallyData', data)
        this.price = 0
        this.remark = ''
        this.$message.success('保存成功')
      } else {
        this.$message.info('亲，备注不能为空，金额不能为0')
      }
    },
    toggleType() {
      console.log(this.type)
      this.type = this.type === 0 ? 1 : 0
    }
  },
  watch: {
    remark (val) {
      if (val.length > this.remarkMaxLength) {
        this.remark = this.remark.slice(0, this.remarkMaxLength)
        this.$message.info(`亲，备注字数不能超过${this.remarkMaxLength}个`)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/common/styles/scss/index.scss";

.accounting {
  .type_wrap {
    background-color: $theme_blue;
    color: $white;
    .type {
      text-align: center;
      .expense,
      .income {
        position: relative;
        padding: 18px 0;
      }
      .checked {
        &::after {
          content: "";
          position: absolute;
          bottom: 5px;
          left: 50%;
          width: 50px;
          height: 3px;
          display: inline-block;
          background-color: $white;
          margin-left: -25px;
          border-radius: 2px;
          animation: move 0.3s cubic-bezier(0.61, 0.01, 0.44, 1.79);
          @keyframes move {
            from {
              left: 30%;
              opacity: 0;
            }
            to {
              left: 50%;
              opacity: 1;
            }
          }
        }
      }
    }
  }

  .tags {
    display: flex;
    padding: 15px;
    .tags_left {
      flex: 0 0 40px;
      margin-right: 20px;
      font-size: 16px;
      font-weight: 700;
    }
    .tags_right {
      display: flex;
      flex-wrap: wrap;
      max-height: 200px;
      overflow: auto;
      .tags_item {
        margin: 0 10px 10px 0;
        padding: 10px 15px;
        background-color: $white;
        border-radius: 10px;
      }
      .checked {
        background-color: $theme_blue;
        color: $white;
      }
    }
  }

  .main {
    position: fixed;
    z-index: 1;
    bottom: 66px;
    .input_wrap {
      padding: 15px;
      background-color: $white;
      .remark_wrap {
        display: flex;
        margin-bottom: 30px;
        .remark {
          font-weight: 700;
        }
        .remarkInput {
          flex-grow: 1;
          text-align: right;
          &:focus {
            outline: none;
          }
        }
      }
      .price_wrap {
        display: flex;
        .title {
          font-weight: 700;
        }
        .price {
          flex-grow: 1;
          text-align: right;
        }
      }
    }

    .calc_wrap {
      .calc {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 45px);
        grid-template-areas:
          "a b c d"
          "e f g h"
          "i j k l"
          "m n o l";
        line-height: 45px;
        text-align: center;
        width: 100vw;
        background-color: $light_gray;
        .calc_item {
          border: $divider_black;
          &:active {
            background-color: $light_blue;
          }
        }
        .confirm {
          grid-column: 4;
          grid-row-start: 3;
          grid-row-end: 5;
          line-height: 104px;
        }
        .zero {
          grid-row: 4;
          grid-column-start: 1;
          grid-column-end: 3;
        }
      }
    }
  }
}
</style>
