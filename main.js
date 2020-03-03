import Vue from 'vue'
import App from './App'
import Voice from 'components/QS-baiduyy/QS-baiduyy.js'
// import Voice from 'js_sdk/QuShe-baiduYY/QS-baiduyy/QS-baiduyy1.js'
Vue.config.productionTip = false;
Vue.prototype.checkLogin = function(backpage = '', backtype = '') {
	//获取地理位置
	uni.getLocation({
		type: 'wgs84',
		altitude: true,
		success(res) {
			uni.setStorageSync('LATITUDE', res.latitude);
			uni.setStorageSync('LONGITUDE', res.longitude);
		}
	})
	var STID = uni.getStorageSync('STID');
	var NAME = uni.getStorageSync('NAME');
	var IPHONE = uni.getStorageSync('IPHONE');
	var NICKNAME = uni.getStorageSync('NICKNAME');
	if (STID == '') {
		 		uni.redirectTo({
					url: '/pages/index/login?backpage='+backpage+"&backtype="+backtype
				}); 
		return false;
	}
	return [STID, , NAME, IPHONE, NICKNAME];
}
const APISERVER = "https://dongyi.sir6.cn"
Vue.prototype.apiServer = APISERVER;

function checkNewOrder() {
	setInterval(function() {
		　	uni.request({
			url: APISERVER+'/staff/order/notice',
			method: 'GET',
			data: {
				st_id:uni.getStorageSync('STID'),
				notice:1
			},
			success: res => {
				if(res.data.err==0){
					Voice('您有新的订单，请注意查收');
				}else{

				}
			},
			fail: () => {},
			complete: () => {}
		});
	}, 30000)
}
  // checkNewOrder();

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
