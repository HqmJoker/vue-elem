<template>
  <header class="header">
    <i class="el-icon-search" @click="goSearch"></i>
    <span class="address" @click="goLocation">{{ defaultLocation.name }}</span>
    <HeadLogin></HeadLogin>
  </header>
  <main class="main">
    <el-carousel height="200px" :autoplay="false" arrow="never">
      <el-carousel-item>
        <ul class="foodList">
          <li class="foodList-item" v-for="(food, foodIndex) in carousel0" :key="foodIndex">
            <img class="foodPic" :src="imgBaseUrl + food.image_url" alt="食物类型" />
            <span>{{ food.title }}</span>
          </li>
        </ul>
      </el-carousel-item>
      <el-carousel-item>
        <ul class="foodList">
          <li class="foodList-item" v-for="(food, foodIndex) in carousel1" :key="foodIndex">
            <img class="foodPic" :src="imgBaseUrl + food.image_url" alt="食物类型" />
            <span>{{ food.title }}</span>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel> 
    <div class="shoplist">
      <div class="shoplist-title">
        <i class="iconfont icon-shangjia"></i>
        <span>附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </main>
  <Tabbar class="tabbar" :activeIndex="0"></Tabbar>
</template>

<script>
import HeadLogin from '@/components/head-login.vue'
import Tabbar from '@/components/tabbar.vue'
import ShopList from '@/components/shop-list.vue'
import { mapGetters } from 'vuex'
import { getFoodType } from '@/api/home.js'

export default {
  components: {
    HeadLogin,
    Tabbar,
    ShopList
  },
  data() {
    return {
      foodType: [], // 食物类型
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
    }
  },
  computed: {
    ...mapGetters(['defaultLocation', 'defaultLocation']),
    carousel0() {
      return this.foodType.slice(0, 8)
    },
    carousel1() {
      return this.foodType.slice(8)
    },
  },
  mounted() {
    this.getFoodType();
  },
  methods: {
    // 获取食物分类
    getFoodType() {
      getFoodType(this.defaultLocation.geohash).then(res => {
        this.foodType = res;
      })
    },
    // 跳转到搜索页面
    goSearch() {
      this.$router.push({
        name: 'Search'
      })
    },
    // 跳转到修改位置
    goLocation() {
      this.$router.push({
        name: 'Location'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: $blue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  color: white;
  height: 50px;
  box-sizing: border-box;
}
.main {
  width: 100%;
  height: calc(100vh - 50px - 50px); // 视图高度-头部高度-尾部高度
  overflow-y: auto;
  .el-carousel {
    margin-bottom: 10px;
    .foodList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      padding: 10px 0;
      background-color: #fff;
      &-item {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
        .foodPic {
          width: 45px;
          height: 45px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .shoplist {
    background-color: #fff;
    &-title {
      padding: 10px;
      .iconfont {
        margin-right: 10px;
      }
    }
  }
}
</style>

<style lang="scss">
  .el-carousel {
    .el-carousel__indicators {
       .el-carousel__indicator {
        .el-carousel__button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #000;
          opacity: .2;
        }
      }
      .is-active {
        .el-carousel__button {
          background: $blue;
          opacity: 1;
        }
      }
    }
  }
</style>
