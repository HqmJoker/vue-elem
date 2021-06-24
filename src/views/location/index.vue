<template>
  <header class="header">
    <span>vue3.elem</span>
    <div class="operation">
      <span @click="login">登录</span>
       | 
      <span @click="register">注册</span>
    </div>
  </header>
  <main class="main">
    <!-- 定位位置 -->
    <section class="guess">
      <p class="guess-tips">
        <span>当前定位城市：</span>
        <span class="guess-tips-right">定位不准时，请在城市列表中选择</span>
      </p>
      <p class="guess-location" @click="goAddrDetail(guessCity)">
        <span class="guess-location-addr">{{ guessCity && guessCity.name }}</span>
        <i class="icon el-icon-arrow-right"></i>
      </p>
    </section>
    <!-- 热门城市 -->
    <section class="hot">
      <h3>热门城市</h3>
      <ul class="cities">
        <li class="city-item" v-for="city in hotCity" :key="city.id" @click="goAddrDetail(city)">{{ city.name }}</li>
      </ul>
    </section>
    <!-- 全部城市 -->
    <ul class="allCity">
      <li class="allCity-item" v-for="(cityGroup, groupIndex) in allCityGroup" :key="cityGroup">
        <p class="groupIndex">{{ cityGroup }}<span v-if="!groupIndex" class="small-text">(按字母排序)</span></p>
        <ul class="cities">
          <li class="city-item" v-for="city in allCity[cityGroup]" :key="city.id" @click="goAddrDetail(city)">{{ city.name }}</li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<script>
import { getLocationCity } from '@/api/city'
import { mapGetters, mapMutations } from 'vuex'

export default {

  data() {
    return {
      // 当前位置信息
      guessCity: {
        name: '',
      },
      hotCity: [], // 热门城市
      allCity: [], // 全部城市
    }
  },
  mounted() {
    this.getLocationCity();
  },
  computed: {
    ...mapGetters(['curLocation', 'hotCities', 'allCities']),
    allCityGroup() {
      return Object.keys(this.allCity).sort();
    }
  },
  methods: {
    ...mapMutations('location', ['SET_CURRENT_LOCATION', 'SET_HOT_CITIES', 'SET_ALL_CITIES']),
    // 点击城市后跳转具体详情
    goAddrDetail(cityInfo) {
      this.$router.push({
        name: 'City',
        query: {
          id: cityInfo.id
        }
      })
    },
    // 获取城市列表
    getLocationCity() {
      this.getCurCity();
      this.getHotCity();
      this.getAllCity();
    },
    // 获取当前城市
    getCurCity() {
      if(this.curLocation) {
        this.guessCity = this.curLocation;
        return;
      }
      getLocationCity('guess').then(res => {
        this.guessCity = res;
        this.SET_CURRENT_LOCATION(res);
      })
    },
    // 获取热门城市
    getHotCity() {
      if(this.hotCities && this.hotCities.length) {
        this.hotCity = this.hotCities;
        return;
      }
      getLocationCity('hot').then(res => {
        this.hotCity = res;
        this.SET_HOT_CITIES(res);
      })
    },
    // 获取所有城市
    getAllCity() {
      if(this.allCities) {
        this.allCity = this.allCities;
        return;
      }
      getLocationCity('group').then(res => {
        this.allCity = res;
        this.SET_ALL_CITIES(res);
      })
    },

    login() {
      console.log("登录")
    },
    register() {
      console.log("注册")
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
  .operation {
    font-size: 14px;
  }
}
.main {
  background-color: #f8f8f8;
  .guess, .hot, .allCity-item {
    margin-bottom: 20px;
    background-color: #fff;
    font-size: 14px;
  }
  .guess {
    p {
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 10px;
    }
    &-tips {
      font-size: 14px;
      &-right {
        font-size: 12px;
        color: #9f9f9f;
      }
    }
    &-location {
      font-size: 16px;
      &-addr {
        color: $blue;
      }
      .icon {
        font-weight: 600;
      }
    }
  }
  .hot {
    h3 {
      padding: 12px 10px;
      border-bottom: 1px solid #e4e4e4;
    }
    .cities {
      display: flex;
      flex-wrap: wrap;
      .city-item {
        width: 25%;
        text-align: center;
        padding: 12px 8px;
        box-sizing: border-box;
        border-bottom: 1px solid #e4e4e4;
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $blue;
      }
    }
  }
  .allCity {
    padding-bottom: 20px;
    &-item {
      .groupIndex {
        padding: 12px 10px;
        border-bottom: 1px solid #e4e4e4;
        .small-text {
          font-size: 12px;
          color: #9f9f9f;
          margin-left: 10px;
        }
      }
      .cities {
        display: flex;
        flex-wrap: wrap;
        .city-item {
          width: 25%;
          text-align: center;
          padding: 12px 8px;
          box-sizing: border-box;
          border-bottom: 1px solid #e4e4e4;
          border-right: 1px solid #e4e4e4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
