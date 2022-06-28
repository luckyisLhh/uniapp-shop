<template>
	<view class="my-search-container" :style="{'background-color': bgColor}">
		<view class="my-serach-box" :style="{'border-radius': borderRadius + 'rpx'}" @click="clickSearch">
			<uni-icons type="search" size="20"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			bgColor: {
				type: String,
				default: "#c00000",
			},
			borderRadius: {
				type: Number,
				default: 30,
			}
		},
		data() {
			return {
			
			};
		},
		methods: {
			clickSearch() {
				this.$emit('click',123);
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-search-container {
	padding: 15rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0rpx;
	z-index: 1;
	width: 100%;
	.my-serach-box {
		width: 600rpx;
		height: 50rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		text {
			margin-left: 10rpx;
		}
	}
}
</style>