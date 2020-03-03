<template>
	<view>
		你好
	</view>
</template>

<script> 
	export default {
		onLoad() {
			uni.chooseLocation({
			keyword:"小路口镇",
			success: function (res) {
				console.log(res);
			console.log('位置名称：' + res.name);
			console.log('详细地址：' + res.address); // 移动端大部分地址不带省市区，浏览器预览出来会带上 求解决方案 ？？？？？？？？？
			}
			});
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
