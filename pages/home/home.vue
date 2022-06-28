<template>
	<view class="container">
		<my-search @click="gotoSearch"></my-search>
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000"
			:duration="duration">
			<swiper-item v-for="(item, index) in swipperList" :key="index">
				<navigator class="swipper-item" :url="'/pages/goods/details/details?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode="heightFix"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navListHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index" >
				<view class="floor-title">
					<image :src="item.floor_title.image_src" mode="heightFix"></image>
				</view>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" :url="item2.url">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" v-if="index2 !== 0" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {swiperApi,navListApi,floorListApi} from "../../api/goods.js"
	export default {
		data() {
			return {
				swipperList: [] ,// 轮播图列表
				navList: [], // 导航栏
				floorList: [], //楼层数据
			};
		},
		onLoad() {
			swiperApi().then(res => {
				this.swipperList = res
			}); 
			navListApi().then(res => {
				this.navList = res
			})
			this.getFloorList();
		},
		methods: {
			// 导航栏跳转
			navListHandler(item) {
				if(item.name === "分类") {
					uni.switchTab({
						url:"/pages/sort/sort"
					})
				}
			},
			// 获取楼层数据并给每个图片添加跳转连接
			getFloorList() {
				floorListApi().then(res => {
					res.forEach(item => {
						item.product_list.forEach(item2 => { // 给每个图片添加url属性
							item2.url = "/pages/goods/goodsList/goodsList?" + item2.navigator_url.split('?')[1]; 
						})
					})
					this.floorList = res;
				});
				
			},
			gotoSearch(e) {
				uni.navigateTo({
					url:"/pages/goods/search/search"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.container {
	position: absolute;
	top: 79rpx;
	left: 0;
	.swiper {
		height: 330rpx;
		.swipper-item,
		image{
			height: 100%;
			width: 100% !important;
		}
	}
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0;
		.nav-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image {
				width: 120rpx;
				height: 120rpx;
			}
		}
	}
	.floor-list {
		display: flex;
		flex-direction: column;
		.floor-item {
			display: flex;
			flex-direction: column;
			padding: 10rpx 0;
			.floor-title {
				height: 60rpx;
				image {
					height: 100%;
					width: 100% !important;
				}
			}
		}
	}
}
.floor-img-box {
	display: flex;
	margin-left: 10rpx;
}
.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
</style>
