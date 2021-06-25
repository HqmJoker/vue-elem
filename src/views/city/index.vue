<template>
  <header class="header">
    <i class="icon el-icon-arrow-left" @click="goBack"></i>
    <span class="header-cityName">{{ cityName }}</span>
    <span class="header-right" @click="goBack">切换城市</span>
  </header>
  <main class="main">
    <div class="search">
      <el-input v-model="searchKey" placeholder="输入学校、商务楼、地址"></el-input>
      <el-button type="primary" @click="getCityDetail">提交</el-button>
    </div>
    <div class="history" v-if="!isSearch && placeHistory.length">
      <p class="history-title">历史记录</p>
      <ul class="history-list">
        <li class="history-list-item" v-for="(addr, index) in placeHistory" :key="index" @click="setLocation(addr)">
          <p class="name">{{ addr.name }}</p>
          <p class="detail">{{ addr.address }}</p>
        </li>
      </ul>
      <p class="clearAll" @click="clearHistory">清空所有</p>
    </div>
    <ul class="searchResult" v-if="isSearch && searchResult.length>0">
      <li class="searchResult-item" v-for="(addr, index) in searchResult" :key="index" @click="setLocation(addr)">
        <p class="name">{{ addr.name }}</p>
        <p class="detail">{{ addr.address }}</p>
      </li>
    </ul>
    <p class="noData" v-if="isSearch && !searchResult.length">很抱歉！无搜索结果</p>
  </main>
</template>

<script>
import { getCityInfo, getCityDetail } from '@/api/city'
import { ElMessage } from 'element-plus'
import { mapActions } from 'vuex'
import { getStore, setStore, removeStore } from '@/utils/localStorage.js'

export default {
  data() {
    return {
      cityName: '',  // 城市名称
      cityId: '', // 城市id
      searchKey: '', // 搜索关键字
      searchResult: [], // 搜索结果列表
      placeHistory: [], // 历史地址记录
      isSearch: false, // 是否已经搜索过,用于判断显示内容块
    }
  },
  mounted() {
    this.cityId = this.$route.query.id;
    this.placeHistory = getStore('placeHistory') || [];
    this.getCityInfo();
  },
  computed: {
  },
  methods: {
    ...mapActions('location', {
      setStoreLocation: 'setLocation'
      }),
    // 清空所有历史记录
    clearHistory() {
      removeStore('placeHistory');
      this.placeHistory = [];
    },
    // 选择详细地址
    setLocation(addr) {
      const checkRepeat = this.placeHistory.some(item => item.geohash === addr.geohash)
      if(!this.placeHistory.length || !checkRepeat) {
        this.placeHistory.push(addr)
      }
      setStore('placeHistory', this.placeHistory);
      this.setStoreLocation(addr);
      this.$router.push({
        name:'Home'
      })
    },
    // 搜索地址
    getCityDetail() {
      if(!this.searchKey) {
        ElMessage({
          message: '请输入关键字再进行搜索!',
          type: 'warn'
        })
        return;
      }
      const params = {
        city_id: this.cityId,
        keyword: this.searchKey
      }
      getCityDetail(params).then(res => {
        this.searchResult = res
        this.isSearch = true;
      })
    },
    // 初始化请求城市信息
    getCityInfo() {
      getCityInfo(this.cityId).then(res => {
        this.cityName = res.name
      })
    },
    // 返回上一级
    goBack() {
      history.go(-1)
    }

  }
}
</script>

<style lang='scss' scoped>
.header {
  background: $blue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  color: white;
  font-size: 18px;
  .icon, &-cityName{
    font-weight: 600;
  }
  .icon {
    width: 56px;
  }
  &-right {
    font-size: 14px;
  }
}
.main {
  .search {
    margin: 10px 0;
    padding: 10px 20px;
    background-color: white;
    .el-input {
      margin-bottom: 10px;
    }
    .el-button {
      width: 100%;
    }
  }
  .searchResult {
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    &-item {
      padding: 10px 20px;
      border-bottom: 1px solid #e4e4e4;
      .detail {
        font-size: 14px;
        color: #999;
        margin-top: 10px;
      }
    }
  }
  .history {
    background-color: #fff;
    &-title {
      text-align: center;
      padding: 10px 20px;
      font-size: 14px;
      border-bottom: 1px solid #e4e4e4;
    }
    &-list {
      &-item {
        padding: 10px 20px;
        border-bottom: 1px solid #e4e4e4;
        .detail {
          font-size: 14px;
          color: #999;
          margin-top: 10px;
        }
      }
    }
    .clearAll {
      padding: 10px 0;
      text-align: center;
      font-size: 14px;
      color:#606266;
    }
  }
  .noData {
    text-align: center;
    background-color: #fff;
    padding: 10px 20px;
  }
}
</style>
