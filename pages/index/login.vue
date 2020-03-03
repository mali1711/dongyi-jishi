<template>
	<view class="content">
		<form @submit="formSubmit">
		<view class="login-bg">
			<view class="login-card">
				<view class="login-head">请输入你的账户</view>
				<view class="login-input login-margin-b">
					<input type="number" name="iphone" placeholder="输入手机号" />
				</view>
				<view class="login-input">
					<input type="password" name="passwd" placeholder="请输入密码(6-16位)" />
				</view>
				<view class="login-function">
					<view class="login-forget" @click="go_forget">忘记密码</view>
				</view>
			</view>	
		</view> 
		<view class="login-btn">
			<button form-type="submit" class="landing" type="primary">登陆</button>
		</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				backpage:'/pages/index/index',
				backtype:'redirectTo'
			}
		},
		onLoad(options) {
			console.log(options)
			
		},
		onReady(){

		},
		methods: {
			formSubmit:function(e){
				var t = this;
				uni.request({
					url: this.apiServer+'/staff/staff/login',
					method: 'POST',
					data: e.detail.value,
					success: res => {
						let data = res.data;
						if(data.err>0){
							uni.showToast({
								title: data.msg
							});
						}else{
							uni.setStorageSync('STID',data.data.st_id);
							uni.setStorageSync('NAME',data.data.name);
							uni.setStorageSync('IPHONE',data.data.iphone);
							uni.setStorageSync('NICKNAME',data.data.nickname);
							uni.reLaunch({
								url: t.backpage
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			go_forget(){
				uni.navigateTo({
				    url: 'forget'
				})
			},
			go_register(){
				uni.navigateTo({
					url: '../../pages/register/register'
				})
			}
			
		}
	}
</script>

<style>
	.landing{
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(left,#FF978D, #FFBB69);
	}
	.login-btn{
		padding: 10upx 20upx;
		margin-top: 350upx;
	}
	.login-function{
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	}
	.login-forget{
		float: left;
		font-size: 26upx;
		color: #999;
	}
	.login-register{
		color: #666;
		float: right;
		font-size: 26upx;

	}
	.login-input input{
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 8upx;
	}
	.login-margin-b{
		margin-bottom: 25upx;
	}
	.login-input{
		padding: 10upx 20upx;
	}
	.login-head{
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}
	.login-card{
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0,0,0,0.12);
		position: relative;
		margin-top: 120upx;
	}
	.login-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(#FF978D, #FFBB69);
	}
</style>
