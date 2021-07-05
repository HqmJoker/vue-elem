<template>
  <ul class="shop-list">
    <li class="shop-list-item" v-for="shop in shopList" :key="shop.id">
      <img class="shopPic" :src="IMG_BASE_URL + shop.image_path" alt="商家图片" />
      <div class="shopInfo">

        <div class="shopInfo-top">
          <span class="shopInfo-top-left" :class="shop.is_premium ? 'premium': ''">{{ shop.name }}</span>
          <ul class="shopInfo-top-right">
            <li v-for="item in shop.supports" :key="item.id" class="supports">{{ item.icon_name }}</li>
          </ul>
        </div>

        <div class="shopInfo-center">
          <div class="shopInfo-center-left">
            <RateStar :max="5" :value="shop.rating"><span class="sartValue">{{ shop.rating }}</span></RateStar>
            <span>月售{{ shop.recent_order_num }}单</span>
          </div>
          <div class="shopInfo-center-right">
            <span class="delivery_style delivery_left" v-if="shop.delivery_mode">{{shop.delivery_mode.text}}</span>
            <span class="delivery_style delivery_right" v-if="shop.zhunshi">准时达</span>
          </div>
        </div>

        <div class="shopInfo-bottom">
          <div class="shopInfo-bottom-left">
            ¥{{ shop.float_minimum_order_amount }}起送
            <span class="segmentation">/</span>
            {{ shop.piecewise_agent_fee.tips }}
          </div>
          <div class="shopInfo-bottom-right">
            <span v-if="Number(shop.distance)">{{shop.distance > 1000? (shop.distance/1000).toFixed(2) + 'km': shop.distance + 'm'}}
              <span class="segmentation"> / </span>
            </span>
            <span v-else>{{ shop.distance }}</span>
            <span class="segmentation"> / </span>
            <span class="order_time">{{ shop.order_lead_time }}</span>
          </div>

        </div>

      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { getShopList } from '@/api/home.js'
import { IMG_BASE_URL } from '@/assets/data/index.js'
import RateStar from '@/components/rateStar.vue'

export default {
  name: 'ShopList',
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
  components: {
    RateStar
  },
  data() {
    return {
      IMG_BASE_URL, // 图片根路径
      offset: 0, // 当前页数
      // 商家列表
      shopList: [],
    }
  },
  mounted() {
    this.getShopList();
  },
  computed: {
    ...mapGetters(['defaultLocation'])
  },
  methods: {
    getShopList() {
      const params = {
        latitude: this.defaultLocation.latitude,
        longitude: this.defaultLocation.longitude,
        offset: this.offset,
        restaurant_category_id: this.restaurantCategoryId || '',
        restaurant_category_ids: this.restaurant_category_ids || '',
        order_by: this.sortByType || '',
        delivery_mode: this.deliveryMode || '',
        support_ids: this.supportIds || []
      }
      getShopList(params).then(res => {
        res.forEach(item => {
          if((item.supports instanceof Array) && item.supports.length) {
            item.zhunshi = item.supports.some(support => support.icon_name === '准')
          }
        });
        this.shopList = res;
      });
    }
  }
}
</script>

<style lang='scss' scoped>
.shop-list {
  &-item {
    display: flex;
    justify-content: space-between;
    padding: 16px 10px;
    border-bottom: 1px solid #f1f1f1;
    .shopPic {
      width: 63px;
      height: 63px;
      flex-shrink: 0;
      margin-right: 8px;
    }
    .shopInfo {
      width: 100%;
      &-top, &-center, &-bottom {
        display: flex;
        justify-content: space-between;
        color: #333;
        margin-bottom: 12px;
        font-size: 12px;
      }
      &-top {
        font-size: 14px;
  			.premium::before{
          content: '品牌';
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.2em;
          background-color: #ffd930;
          padding: 2px 4px;
          border-radius:4px;
          margin-right: 8px;
        }
        &-right {
          display: flex;
          font-size: 12px;
          color: #999;
          li {
            border: 1px solid #f1f1f1;
            padding: 1px;
            border-radius: 2px;
          }
        }
      }
      &-center {
        &-left {
          display: flex;
          .sartValue {
            color: #ff6000;
            margin-right: 5px;
          }
        }
        &-right {
          .delivery_style {
            padding: 1px 2px;
            border-radius: 2px;
            margin-left: 2px;
            border: 1px solid $blue;
          }
          .delivery_left {
            color: #fff;
            background-color: $blue;
          }
          .delivery_right {
            color: $blue;
          }
        }
      }
      &-bottom {
        &-left {
          color: #666;
          .segmentation {
            margin: 0 2px;
          }
        }
        &-right {
          color: #999;
          .order_time {
            color: $blue;
          }
        }
      }
    }
  }




}
</style>
