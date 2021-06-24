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
/**
 * 设备监控数据统计页面--产品品类分析
 * @param  prodTypeId  产品品类id
 * @param  method   属性的标识符
 * @param  start   开始时间 格式：yyyy-mm-dd hh:mm:ss
 * @param  end    结束时间 格式：yyyy-mm-dd hh:mm:ss
 * @param  aggregator  聚合器 默认sum
 * @param  fillName  是否填充名称
 * @param  params    参数，Object
						* attrKey    参数键，为标识符，可能值：gid  分组 --系统属性；
						* attrValue   参数值
						* groupBy    是否按过滤器匹配的每个值对结果进行排序
						* filter			过滤器，为空表示为单个精确匹配，可能值：
													* 1）literal_or  包含查询，多个值用”|“分开；
													* 2）not_literal_or  不包含查询。多个值用”|“分开；
													* 3）wildcard  通配符匹配，通配符为”*“，参数值中必须至少存在一个通配符	
 * @param  downsample    降采样，降低采样的频率
						* interval     间隔
						* unit         单位，可能值：m  秒；s  分；h  时；d 天；w  周；mon  月；y  年；all  全部值
						* aggregator   聚合器
						* fillPolicy   缺失值补齐政策，可能值：NONE  不补齐；NAN  用nan补齐；NULL  用null补齐； ZERO  用0补齐
 */
export function getStatisticsSpecial(data) {
	return request({
		url: '/tsdb/alink/count',
		method: 'post',
		data: data
	})
}