<template>
	<view class="content">
		<view class="forget-bg">
			<view class="forget-card">
				<view class="forget-input forget-margin-b">
					<input v-model="iphone" type="number" placeholder="请输入您的手机号" />
				</view>
				<view class="forget-input forget-margin-b">
					<view class="verify-left">
						<input v-model="inputcode" type="number" placeholder="请输入验证码" />
					</view>
					<view class="verify-right">
						<button class="landing" :class="{landing : !disableCodeBtn}" :disabled="disableCodeBtn" @tap="sendCode">{{codeBtn.text}}</button>
					</view>
				</view>
				<view class="forget-input">
					<input v-model="passwd" type="number" placeholder="请输入密码(8-16位)" />
				</view>
			</view>
		</view>
		<view class="forget-btn">
			<button @click="forgetPasswd()" class="landing" type="primary">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				captchaImg: '',
				iphone:'',
				passwd:'',
				seconds: 120,
				inputcode:'',//用户输入的验证码
				code: '',//接口返回的验证码
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				},
				changeSuccess: false
			}
		},
		onLoad() {

		},
		methods: {
			sendCode: function() {
				let t = this;
				this.codeBtn.waitingCode = true;
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';

				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
						this.codeBtn.waitingCode = false;
					}
				}, 1000);
				uni.request({
					url: this.apiServer + '/staff/staff/sendmsg',
					method: 'POST',
					data: {
						mobile: this.iphone,
					},
					success: res => {
						console.log(res);
						if (res.data.err == 0) {
							t.code = res.data.code;
							console.log(this.code);
							uni.showToast({
								title: '短信发送成功'
							});
						}
					}
				});
			},
			forgetPasswd:function(){
				console.log(this.inputcode);
				if(this.inputcode==this.code){
					uni.request({
						url: this.apiServer+'/staff/staff/forget',
						method: 'POST',
						data: {
							iphone:this.iphone,
							passwd:this.passwd
						},
						success: res => {
							if(res.data.err==0){
								uni.showToast({
									title: '密码修改成功'
								});
								uni.redirectTo({
									url: '/pages/index/login',
									success: res => {}
								});
							}else{
								uni.showToast({
									title: res.data.msg
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					uni.showToast({
						title: '验证码输入错误'
					});
				}
				console.log(this.code)
			}
		},
		computed: {
			disableCodeBtn: function() {
				return this.codeBtn.waitingCode || this.iphone.length < 11;
			}
		}
	}
</script>

<style>
	.verify-left {
		width: calc(100% - 260upx);
	}

	.verify-right {
		padding-left: 20upx;
	}

	.verify-btn {
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		width: 240upx;
		border-radius: 8upx;
		background: linear-gradient(left, #FF978D, #FFBB69);
	}

	.verify-left,
	.verify-right {
		float: left;
	}

	.landing {
		height: 84upx;
		width: 230upx;
		text-align: center;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(left, #FF978D, #FFBB69);
	}

	.forget-btn {
		padding: 10upx 20upx;
		margin-top: 380upx;
	}

	.forget-input input {
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 8upx;
	}

	.forget-margin-b {
		margin-bottom: 25upx;
	}

	.forget-input {
		padding: 10upx 20upx;
		overflow: auto;
	}

	.forget-card {
		background: #fff;
		border-radius: 12upx;
		padding: 60upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		margin-top: 120upx;
	}

	.forget-bg {
		height: 260upx;
		padding: 25upx;
		background: linear-gradient(#FF978D, #FFBB69);
	}
</style>
