import request from '@/utils/request'

/**
 * 获取当前城市位置/热门城市/全部城市
 * @param  type  城市类型 1.guess：定位城市， 2.hot：热门城市 3.group：全部城市
 * @returns {Object} Promise
 */
export function getLocationCity(type) {
	return request({
		url: '/api/v1/cities?type='+type,
		method: 'get'
	})
}
/**
 * 根据城市id查询城市信息
 * @param  id  城市di
 * @returns {Object} Promise
 */
export function getCityInfo(id) {
	return request({
		url: '/api/v1/cities/'+id,
		method: 'get'
	})
}
/**
 * 获取搜索地址
 * @param  city_id  城市di
 * @param  keyword  搜索关键字
 * @returns {Object} Promise
 */
export function getCityDetail(data) {
	let str = '';
	for(let key in data) {
		str = str + '&' + key + '=' + data[key]
	}
	return request({
		url: '/api/v1/pois?type=search'+str,
		method: 'get'
	})
}