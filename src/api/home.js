import request from '@/utils/request'

/**
 * 把对象格式参数转换成query string形式参数
 * @returns {String} latitude=23.025683&longitude=113.311814&offset=0&limit=20&extras[]=activities&keyword=&restaurant_categ
 */
function params2Query(data) {
	let str = '';
	for(let key in data) {
		str = str + '&' + key + '=' + data[key]
	}
	return str.slice(1)
}

/**
 * 账号密码登录
 * @param geohash 经纬度
 * @param group_type 
 * @param flags[] 验证码
 * @returns {Object} Promise
 */
export function getFoodType(geohash) {
	return request({
		url: 'api/v2/index_entry?group_type=1&flags[]=F&geohash='+geohash,
		method: 'get'
	})
}
/**
 * 获取商铺列表
 * @param latitude 经纬度（用于获取附近商品）
 * @param longitude 经纬度（用于获取附近商品）
 * @param offset 
 * @param restaurant_category_id 
 * @param restaurant_category_ids 
 * @param order_by 
 * @param delivery_mode 
 * @param support_ids 
 * @returns {Object} Promise
 */
 export function getShopList(params) {
	let supportStr = '';
	const { latitude, longitude, offset, restaurant_category_id, restaurant_category_ids, order_by, delivery_mode, support_ids } = params;
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	const str = params2Query(data)
	return request({
		url: 'api/shopping/restaurants?'+str,
		method: 'get'
	})
};

