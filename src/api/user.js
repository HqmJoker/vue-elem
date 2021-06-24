import request from '@/utils/request'

/**
 * 获取图片验证码
 * @returns {Object} Promise
 */
export function getcaptchas() {
	return request({
		url: 'api/v1/captchas',
		method: 'post',
		data: {}
	})
}
/**
 * 账号密码登录
 * @param username 账号
 * @param password 密码
 * @param captcha_code 验证码
 * @returns {Object} Promise
 */
export function accountLogin(data) {
	return request({
		url: 'api/v2/login',
		method: 'post',
		data
	})
}