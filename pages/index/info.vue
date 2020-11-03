<template>
	<view>
		<cmd-nav-bar back title="信息详情"></cmd-nav-bar>
		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
				<view>
					<cmd-cel-item title="头像" slot-right arrow>
						<cmd-avatar src="https://avatar.bbs.miui.com/images/noavatar_small.gif"></cmd-avatar>
					</cmd-cel-item>
					<cmd-cel-item title="接单金额" addon="566" arrow></cmd-cel-item>
					<cmd-cel-item title="昵称"    @click="fnClick('nickname')" :addon="staffInfo.nickname" arrow></cmd-cel-item>
					<cmd-cel-item title="姓名" @click="fnClick('no')" :addon="staffInfo.name" arrow></cmd-cel-item>
					<cmd-cel-item title="手机号"   @click="fnClick('iphone')" :addon="staffInfo.iphone" arrow></cmd-cel-item>
					<cmd-cel-item title="证件号码" @click="fnClick('code')" :addon="staffInfo.code" arrow></cmd-cel-item>
					<cmd-cel-item title="我的地址" @click="fnClick('address')" :addon="staffInfo.address" arrow></cmd-cel-item>
					<cmd-cel-item title="修改密码" @click="fnClick('mobile')" arrow></cmd-cel-item>
					<button @click="logout()" class="btn-logout">退出登录</button>
				</view>
			</cmd-transition>
		</cmd-page-body>
		<neil-modal :show="show" @close="closeModal()" :title="'修改'+title" @click="bindBtn()">
			<view class="input-view">
				<view class="input-name">
					<view>{{title}}</view>
					<input v-model="subdata" value="232342" :name="inputname" type="text" :placeholder="'请输入'+title" />
				</view>
			</view>
		</neil-modal>
	</view>
</template>

<script>
	import neilModal from "@/components/neil-modal/neil-modal.vue"
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"

	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdCelItem,
			cmdAvatar,
			neilModal
		},
		onLoad() {
			this.checkLogin();
			this.initUserinfo();

		},
		data() {
			return {
				staffInfo: {},
				show: false,
				title: '',
				subdata: '',
				inputname: ''
			};
		},
		methods: {
			/**
			 * 点击触发
			 * @param {Object} type 跳转页面名或者类型方式
			 */
			fnClick(type) {
				if(type=='no'){
					uni.showToast({
						title: '禁止修改'
					});
				}else{
					if (type == 'mobile') {
						uni.navigateTo({
							url: '/pages/index/forget'
						})
					} else {
						uni.navigateTo({
							url: '/pages/index/upStaffInfo?type=' + type
						})
					}
				}
			},
			initUserinfo() {
				uni.request({
					url: this.apiServer + '/staff/staff/show',
					method: 'GET',
					data: {
						st_id: uni.getStorageSync('STID')
					},
					success: res => {
						let data = res.data;
						this.staffInfo = data.data
						console.log(data);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			updateUserInfo(param, title) {
				this.title = title;
				this.inputname = param;
				this.show = true;
			},
			bindBtn() {
				uni.showToast({
					title: this.subdata
				});
			},
			closeModal() {
				this.show = false;
			},
			logout(){ // 退出登陆
				uni.clearStorage();
				uni.redirectTo({
					url:'login',
				})
			}
		}
	}
</script>

<style>
	.btn-logout {
		margin-top: 100upx;
		width: 80%;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-logout-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}

	.input-name,
	.input-password {
		height: 80upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-left: 30upx;
		box-sizing: border-box;
	}

	.input-name::after {
		content: " ";
		position: absolute;
		left: 30upx;
		bottom: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #e5e5e5;
		transform-origin: 0 0;
		transform: scaleY(.5);
	}

	.input-name view,
	.input-password view {
		width: 120upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #333333;
	}

	.input-name input,
	.input-password input {
		flex: 1;
		height: 50upx;
		line-height: 50upx;
	}
</style>
