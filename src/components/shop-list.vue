<template>
  <ul class="shop-list">
    <li class="shop-list-item">12345</li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { getShopList } from '@/api/home.js'

export default {
  name: 'ShopList',
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
  data() {
    return {
      offset: 0, // 当前页数
      
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
        console.log(res)
      });
    }
  }
}
</script>

<style lang='scss' scoped>
.shop-list {
  padding: 0 10px;
}
</style>
