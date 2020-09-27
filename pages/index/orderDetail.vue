<template>
	<view class="content">
		<view class="address">
			<view style="">{{detailinfo.address_contacts}}</view>
			<view style="">{{detailinfo.address_mobile}} {{detailinfo.address}}</view>
		</view>
		<view class="address-content">
			<img class="projectImg" :src="srcPath+'/uploads/'+detailinfo.pr_info.photo" alt="">
			<view class="address-content-desc">
				<view class="prname">
					<text class="protitle">项目名称:</text>
					<text class="proname">中医推拿</text>
				</view>
				<view class="prname">
					<text class="protitle">{{detailinfo.pr_info.title}}</text>
					<text class="proname">¥{{detailinfo.total_price}}</text>
				</view>
			</view>
		</view>
		<view class="address-content">
			<view class="address-content-desc">
				<view class="prname margin202">
					<text class="protitle">交通补助</text>
					<text class="proname">{{detailinfo.subsidy}}¥</text>
				</view>
				<view class="prname margin202">
					<text class="protitle">预约时间:</text>
					<text class="proname">{{timestampToTime(detailinfo.subtime)}}</text>
				</view>
				<view class="prname margin202">
					<text class="protitle">加购信息({{detailinfo.add_purchase_num}}分钟):</text>
					<text class="proname">{{detailinfo.add_purchase_num*detailinfo.add_purchase_price}}¥</text>
				</view>
				<view class="prname margin202">
					<text class="protitle">订单总金额:</text>
					<text class="proname" style="color: red;font-size: 40rpx;">{{detailinfo.add_purchase_num*detailinfo.add_purchase_price+Number(detailinfo.total_price)}}¥</text>
				</view>
			</view>
		</view>
<!-- 		<view class="address-content">
			<view class="jiagouxinxi">
				当前加购信息 &nbsp;&nbsp;&nbsp;&nbsp;¥50 x 2 <text class="zongjiagou">=¥100</text>
			</view>
		</view> -->
		<view class="sunui">
			<view class="sunui-title">{{detailinfo.note}}</view>
		</view>
		<button v-if="detailinfo.status==0" @click="receive(detailinfo.order_id)" type="warn">确认接单</button>
	</view>
</template>
<script>
	import sunUiStepper from '../../components/sunui-stepper/sunui-stepper.vue'
	export default {
		components: {
			"sunui-stepper": sunUiStepper
		},
		data() {
			return {
				detailinfo:null,
				srcPath:'',
				add_purchase_num:0,
				totalnum:0,
			}
		},
		onLoad(options) {
			this.srcPath = this.apiServer;
			uni.request({
				url:this.apiServer+'/staff/order/detail?order_id='+options.order_id,
				method:'GET',
				success: (res) => {
					this.detailinfo = res.data;
					console.log(this.detailinfo)
					this.add_purchase_num = res.data.add_purchase_minimum;//最低加购数量
					this.totalnum = res.data.add_purchase_num;//当前加购数量
					console.log(this.detailinfo.create_time);
				}
			})
		},
		methods: {
			stepper(e){
				this.add_purchase_num = e.val
			},
			jiagou(){
				console.log(this.detailinfo.order_id);
				console.log(this.add_purchase_num);
				uni.request({
					url: 'https://dongyi.sir6.cn/api/order/jiagou',
					method: 'POST',
					data: {
						order_id:this.detailinfo.order_id,
						add_purchase_num:this.add_purchase_num
					},
					success: res => {
						var result = res.data;
						console.log(result);
						if(result.err==0){
							uni.showToast({
							    title: '修改成功',
							    duration: 2000
							});
							this.totalnum = result.add_purchase_num;
						}else{
							uni.showToast({
							    title: '意外错误，或者您的余额已不足',
							    duration: 2000
							});
						}
					}
				});
			},
			timestampToTime(timestamp) {
			        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			        // let Y = date.getFullYear() + '-';
			        // let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			        // let D = date.getDate() + ' ';
			        // let h = date.getHours() + ':';
			        // let m = date.getMinutes() + ':';
			        // let s = date.getSeconds();
			        // return Y+this.padLeftZero(M)+this.padLeftZero(D)+this.padLeftZero(h)+this.padLeftZero(m)+this.padLeftZero(s);
			        let y = date.getFullYear();
			        let MM = date.getMonth() + 1;
			        MM = MM < 10 ? ('0' + MM) : MM;
			        let d = date.getDate();
			        d = d < 10 ? ('0' + d) : d;
			        let h = date.getHours();
			        h = h < 10 ? ('0' + h) : h;
			        let m = date.getMinutes();
			        m = m < 10 ? ('0' + m) : m;
			        let s = date.getSeconds();
			        s = s < 10 ? ('0' + s) : s;
			        return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
			    },
				call(){
						uni.makePhoneCall({
							phoneNumber:'18396861513',
							// 成功回调
							success: (res) => {
							},
						
							// 失败回调
							fail: (res) => {
							}
						})
				},
			receive(order_id){
				uni.request({
					url: this.apiServer+'/staff/order/receipt',
					method: 'GET',
					data: {
						order_id:order_id
					},
					success: res => {
						let data = res.data;
						if(data.err==0){
							uni.showToast({
								title: '成功接单'
							});
							uni.switchTab({
							    url: '/pages/index/index'
							});
						}else{
							uni.showToast({
								title: '接单失败'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络延迟，请稍后'
						});
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.margin202{
		margin-left: 202rpx;
	}
	.yijiagou{
		color: #D8495D;
		font-size: 40rpx;
		font: bold;
	}
	.jiagouxinxi{
		float: right;
		margin-bottom: 20rpx;
	}
	.content {}

	.address {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		/* 相对父元素水平居中 */
		font-size: 30rpx;
		height: 260rpx;
		color: #FFFFFF;
		background-color: #fd5e5e;
		text-align: center;
	}

	.address-content {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}

	.projectImg {
		height: 200rpx;
		width: 200rpx;
	}

	.address-content-desc {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
		margin-top: 30rpx;
	}

	.prname {
		font-size: 30rpx;
		color: #414141;
		width: 500rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
	}

	.protitle {
		float: left;
	}

	.proname {
		float: right;
	}

	.sunui {
		padding: 4%;
	}

	.sunui-title {
		margin: 0;
		margin-bottom: 4%;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, 0.6);
		padding: 20px 15px 15px;
		border-bottom: 1upx solid #eee;
	}

	.sunui>.sunui-title {
		margin-bottom: 2%;
	}

	.jiagou-border {
		display: flex;
		flex-wrap: wrap;
	}

	.jiagou {
		width: 160rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 320rpx;
	}
</style>
