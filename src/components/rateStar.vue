<template>
  <div class="rateStar">
    <div class="rateBox">
      <ul class="bg-star">
        <li v-for="item in max"><i class="iconfont icon-Starmarker"></i></li>
      </ul>
      <ul class="value-star" :style="{ 'width': starWidth }">
        <li v-for="item in max"><i class="iconfont icon-Starmarker"></i></li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RateStar',
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    starWidth() {
      return (this.value / this.max * 100) + '%'
    }
  }
}
</script>

<style lang='scss' scoped>
.rateStar {
  .rateBox {
    position: relative;
    display: inline-block;
    .bg-star, .value-star {
      display: flex;
      .iconfont {
        color: #ccc;
        font-size: 12px;
      }
    }
    .bg-star {
      margin-right: 5px;
    }
    .value-star {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      overflow: hidden;
      .iconfont {
        color: #f4ea2a;
      }
    }
  }
}
</style>
