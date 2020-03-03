<template>
	<view>
		<view class="content">
			<view class="nav">
				<text@click="datef(item.day,item.disabled,index)" class="dateblock" v-for="(item,index) in date" :key="index" :class="[dateActive==index?'dateblockActive':'dateblock']">
					{{item.day}}
				</text>
			</view>
			<view class="timelist">
				<view @click="timef(item.time,item.disabled,index)" class="timeblock" v-for="(item,index) in time" :key="index" :class="[item.disabled==true?'timeblock-active':'']">
					<view class="timeblock-time">{{item.time}}:00</view>
					<view v-if="item.disabled" class="timeblock-time">可预约</view>
					<view v-if="!item.disabled" class="timeblock-time">已锁定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initdatetime();
		},
		data() {
			return {
				date:[],
				time:[],
				nowdate:'',
				nowtime:'',
				dateActive:0,
				timeActive:0,
				now:''
			}
		},
		methods: {
			initdatetime(){
				var date = new Date();
				var day = ("0" + (date.getDate())).slice(-2);
				this.nowdate = ("0" + (date.getMonth() + 1)).slice(-2)+'-'+day;
				console.log(this.nowdate);
				uni.request({
					url: this.apiServer+'/staff/timemanage/Initial',
					method: 'GET',
					data: {
						 date:this.nowdate,
						 st_id:uni.getStorageSync('STID')
					},
					success: res => {
						let data = res.data;
						this.date = data.date;
						this.time = data.time;
					},
					fail: () => {},
					complete: () => {}
				});

			},
			datef(days,dis,index){
				this.nowdate = days;
				this.dateActive = index;
				console.log(days);
				console.log(dis);
				uni.request({
					url: this.apiServer+'/staff/timemanage/clickTime',
					method: 'GET',
					data: {
						date:days,
						st_id:uni.getStorageSync('STID')
					},
					success: res => {
						this.time = res.data
					},
					fail: () => {},
					complete: () => {}
				});
			},
			timef(tims,dis,index){
				this.now = this.nowdate + ' ' + tims+':00';
				this.timeActive = index;
				uni.request({
					url: this.apiServer+'/staff/timemanage/timeman',
					method: 'GET',
					data: {
						time:this.now,
						st_id:uni.getStorageSync('STID')
					},
					success: res => {
						this.time[index].disabled = !this.time[index].disabled
					},
					fail: () => {},
					complete: () => {} 
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}

	.nav {
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 100rpx;
		width: 100%;
		background-color: #33DCE8;
	}

	.dateblock {
		font-size: 25rpx;
		line-height: 100rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		color: #F1F1F1;
	}

	.dateblockActive {
		font-size: 28rpx;
		font-weight: bold;
		color: red;
	}

	.timelist {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 98%;
		margin-left: 1%;
		border: #DDDDDD 1rpx solid;
	}

	.timeblock {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-left: 25rpx;
		margin-right: 20rpx;
		width: 140rpx;
		height: 80rpx;
		font-size: 30rpx;
		line-height: 40rpx;
		text-align: center;
		background: #EEEEEE;
		color: #666666;
	}
 
	.timeblock-active {
		color: #F1F1F1;
		background-color: #4CD964;
	}

	.subnav {
		margin-top: 80rpx;
		text-align: center;
	}
</style>