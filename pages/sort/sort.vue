<template>
	<view class="sort">
		<my-search @click="gotoSearch()"></my-search>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: phoneUsedWidth + 'px'}">
				<view class="lift-scroll-view-item" v-for="(item, index) in sortList" :key="index" 
					 :class="{active: index === active}" @click="changeActive(item, index)">
					 {{item.cat_name}}
				</view>
			</scroll-view>
			
			<scroll-view class="right-scroll-view" scroll-y="true" :scroll-top="scrollTop" :style="{height: phoneUsedWidth + 'px'}">
				<view class="sort-lv2" v-for="(item, index) in sortList[active].children" :key="index">
					<view class="sort-lv2-title">/{{item.cat_name}}/</view>
					<view class="sort-lv3-list">
						<view class="sort-lv3-item" v-for="(item2, index2) in item.children" :key="index2" @click="gotoGoodsList(item2)">
							<image :src="item2.cat_icon" mode="" class="right-scroll-third-icon" mode="widthFix"></image>
							<text class="right-scroll-third-desc">{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {sortListApi} from "../../api/goods.js"
 	export default {
		data() {
			return {
				phoneUsedWidth: 0,
				sortList: [],
				active: 0,
				scrollTop: 0,
			}
		},
		onLoad() {
			this.phoneUsedWidth = uni.getSystemInfoSync().windowHeight;
			sortListApi().then(res => {
				this.sortList = res;
			})
		},
		methods: {
			// 点击一级分类
			changeActive(item, index) {
				this.active = index;
				this.scrollTop = this.scrollTop ? 0 : 1;
			},
			// 跳转到商品列表
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/pages/goods/goodsList/goodsList?cid=' + item.cat_id,
				})
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
.scroll-view-container {
	position: absolute;
	width: 100%;
	top: 80rpx;
	display: flex;
	.left-scroll-view {
		width: 240rpx;
		.lift-scroll-view-item {
			background-color: #f5f5f5;
			line-height: 60px;
			text-align: center;
			font-size: 18px;
			&.active {
				background-color: #ffffff;
				position: relative;
				&::before {
					content: " ";
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
}
.sort-lv2 {
	display: flex;
	background-color: #ffffff;
	flex-direction: column;
	.sort-lv2-title {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		margin: 20rpx 0 35rpx ;
	}
	.sort-lv3-list {
		display: flex;
		flex-wrap: wrap;
		.sort-lv3-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 10rpx 0;
			width: 33.33%;
			font-size: 12px;
			image {
				width: 100rpx;
			}
		}
	}
}
</style>