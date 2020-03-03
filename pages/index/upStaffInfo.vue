<template>
	<view>
		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
				<form @submit="formSubmit" @reset="formReset">
				<view class="modify">
					<view class="modify-code">
						<input v-if="nickname" type="text" name="nickname" value="" :placeholder="fieldinfo" />
						<input v-if="iphone" type="text" name="iphone" value="" :placeholder="fieldinfo" />
						<input v-if="code" type="text" name="code" value="" :placeholder="fieldinfo" />
						<input v-if="address" type="text" name="address" value="" :placeholder="fieldinfo" />
						<input hidden="true" name='st_id' type="hidden" v-model="st_id" />
					</view>
					<button class="btn-modify" form-type="submit">提交</button>
				</view>
				</form>
			</cmd-transition>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdInput from "@/components/cmd-input/cmd-input.vue"

	export default {
		components: {
			cmdNavBar,
			cmdPageBody,
			cmdTransition,
			cmdInput
		},
		onLoad(options) {
			this.st_id = uni.getStorageSync('STID');
			let type = options.type;
			console.log(type)
			if(type=='nickname'){
				this.field == 'nickname',
				this.fieldinfo = '请输入您的昵称'
				this.nickname = true;

			}else if (type =='iphone'){
				this.field = 'iphone',
				this.fieldinfo = '请输入您的手机号'
				this.iphone=true;
			}else if(type =='address'){
				this.field = 'address',
				this.fieldinfo = '请输入您的地址'
				this.address = true
			}else{
				this.field = 'code',
				this.fieldinfo = '请输入您的身份证号'
				this.code = true
			}
		},
		data() {
			return {
				st_id:'',
			   field : '',
			   fieldinfo : '',
			   nickname:false,
			   name:false,
			   iphone:false,
			   address:false,
			   code:false
			};
		},
		methods: {
				formSubmit: function(e) {
					
					console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					var formdata = e.detail.value
					uni.request({
						url: this.apiServer+'/staff/staff/save',
						method: 'POST',
						data: formdata,
						success: res => {
							if(res.data.err==0){
							uni.reLaunch({
								url: '/pages/index/info'
							})
							}else{
								uni.showModal({
									content: '数据修改失败',
									showCancel: false
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				},
			/**
			 * 提交按钮点击执行
			 */
			fnModify() {
				//console.log(JSON.stringify(this.mobile));
			},
			/**
			 * 获取验证码
			 */

		}

	}
</script>

<style>
	.modify {
		margin-top: 118upx;
		margin-right: 72upx;
		margin-left: 72upx;
	}

	.modify-phone {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2upx #dedede solid;
		margin-top: 118upx;
		margin-bottom: 40upx;
	}

	.modify-phone-getcode {
		color: #3F51B5;
		text-align: center;
		min-width: 140upx;
	}

	.modify-password,
	.modify-code {
		margin-bottom: 40upx;
		border-bottom: 2upx #dedede solid;
	}

	.btn-modify {
		margin-top: 100upx;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		background: linear-gradient(to right, #88a1f9, #9ac6ff);
	}

	.btn-modify-active {
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-modify-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}

	button[disabled] {
		color: #fff;
	}
</style>
