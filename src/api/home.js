import request from '@/utils/request'

/**
 * 账号密码登录
 * @param geohash 经纬度
 * @param group_type 
 * @param flags[] 验证码
 * @returns {Object} Promise
 */
export function getFoodType(geohash) {
	// let str = '';
	// for(let key in data) {
	// 	str = str + '&' + key + '=' + data[key]
	// }
	return request({
		url: 'api/v2/index_entry?group_type=1&flags[]=F&geohash='+geohash,
		method: 'get'
	})
}
