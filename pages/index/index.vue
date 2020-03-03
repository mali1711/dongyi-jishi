<template>
	<view class="content">
		<view class="nav">
			<text @click="selectOrder(index)" :class="[navActive==index?'nav-text-active':'']"  v-for="(item, index) in navlist" :key="index">{{item.navname}}</text>
		</view>
		<view class="orderInfo" v-for="(item,index) in orderList" :key="index">
			<navigator :url="'orderDetail?order_id='+item.order_id">
				<view class="head">
					<text class="addtime"><text class="addtime-title">&nbsp; 时间 </text>：{{item.create_time}}</text> 
					
					<text v-if="item.status==0" class="status" style="color: #00B26A;">等待接单</text>
					<text v-if="item.status==1" class="status" style="color: #007AFF;">进行中</text>
					<text v-if="item.status==2" class="status" style="color: #DD524D;">已完成</text>
				</view>
				<hr>
				<view class="body">
					<view>
						<text class="yuyueshijian">
							<text class="yuyueshijian-title">预约时间</text>：<text class="yuyueshijian2">{{item.subtime}}</text>
						</text>
					</view>
						<view class="dizhi">
							<view class="xiangxidizhi">{{item.address.address}}</view>
							<view class="lianxiren">{{item.address_contacts}}：{{item.address_mobile}}</view>
						</view>
						<view class="xiangmu">
							<text class="xiangmuMing">全身SPA x1</text>
							<text class="zongJiaGe">{{item.add_purchase_price}}¥</text>
						</view>
				</view>
			</navigator>
		</view>
		<view v-if="orderList==''" class="noorderingo">
			<text>{{orderStatus}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navlist :[
					{navname:'新订单'},
					{navname:'进行中'},
					{navname:'已完成'},
					{navname:'全部'}
				],/* 选中信息 */ 
				navActive:0,
				orderList:null,/*, 订单信息 */
				orderStatus:'正在刷新，请稍后'
			}
		}, 
		onLoad() {
			var userinfo = this.checkLogin();
			console.log(userinfo);
			this.getneworder(0);
		},
		onShow() {
			this.getneworder(0);
			uni.getLocation({
				type: 'wgs84',
				geocode:true,
				success: res => {
					console.log(res)
				},
				fail: () => {
					console.log('err')
				},
				complete: () => {}
			});
		},
		methods: {
			selectOrder:function(index){
				this.orderList = [];
				this.navActive = index;
				if (index==0) {
					this.getneworder(0)
				} else if(index==1){
					this.getneworder(1)//订单进行中
				} else if(index==2){
					this.getneworder(2)//订单已完成
				}else{
					this.getneworder('')//全部订单
				}
			},
			getneworder:function(status){
				uni.request({
					url: 'http://dongyi.sir6.cn/staff/order/list',
					method: 'GET',
					data: {
						st_id:uni.getStorageSync('STID'),
						status:status
					},
					success: res => {
						if(res.data.err==0){
							this.orderList = res.data.data;
						}else{
							this.orderList='';
							this.orderStatus='您没有订单信息';
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style>
	.noorderingo{
		width: 100%;
		height: 800rpx;
		background-color: #FFFFFF;
		color: #DDDDDD;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.content{
		background-color: #F1F1F1;
		height: 100%;
	}
	.nav{
		width: 100%;
		height: 100rpx;
		background-color: #33DCE8;
		line-height: 100rpx;
		text-align: center;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	
	.nav text{
		margin-left: 50rpx;
		margin-right: 50rpx;
		color: #FFFFFF;
	}
	.nav-text-active{
		font-weight: bold;
	}
	.font-ffffff{
		color:#ffffff
	}
	.orderInfo{
		margin-top: 20px;
		background-color: #FFFFFF;
		margin-top: 20px;
		height: 320rpx;
	}
	.head{
		font-size: 30rpx;
		line-height: 100rpx;
	}
	.body{
		display: flex;
		flex-direction: column;
	}
	.addtime{
		color: #balce;
		margin-left: 30rpx;
	}
	.status{
		float: right;
		margin-right: 30rpx;
	}
	.yuyueshijian{
		margin-left: 30rpx;
		float: left;
	}
	.jiage{
		margin-right: 30rpx;
		float: right;
		color: red;
		font-weight: bold;
	}
	.dizhi{
		display: flex;
		flex-direction: column;
		float: left;
	}
	.xiangxidizhi{
		float: left;
		margin-left: 30rpx;
		color: #2d2d2d;
		font-size: 30rpx;
	}
	.lianxiren{
		float: left;
		margin-left: 30rpx;
	}
	.xiangmu{
		margin-left: 30rpx;
	}
	.xiangmu .xiangmuMing{
		float: left;
		font-weight: bold;
	}
	.zongJiaGe{
		float: right;
		margin-right: 30rpx;
	}
	.yuyueshijian-title{
		
	}
	.yuyueshijian2{
		color: #d8495d;
	}
	.addtime-title{
		background: #2a7cf9;
		color: #F1F1F1;
		border-radius: 15rpx;
		text-align: center;
		height: 40rpx;
		font-size: 30rpx;
	}
</style>
