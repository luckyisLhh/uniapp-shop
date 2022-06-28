<template>
	<view class="serach">
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入内容" v-model="kw"></uni-search-bar>
		</view>	
		<view class="search-list" v-if="searchResults.length && kw.length">
			<view class="search-list-item" v-for="(item,index) in searchResults" :key="index" @click="goDetailList(item)">
				<view class="search-item-container">{{item.goods_name}}</view>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		<view class="search-history" v-else-if="!searchResults.length && !kw.length">
			<view class="search-history-title">
				<text>搜索历史</text>
				<view class="search-history-delete">
					<uni-icons type="trash" size="20" @click="handleSearchHistory" v-if="!isDelete"></uni-icons>
					<view class="delete-history-box" v-else>
						<view class="delete-all-history" @click="clearHistory">全部删除</view>
						<text>|</text>
						<view class="delete-complete" @click="deleteComplete">完成</view>
					</view>
				</view>
				
			</view>
			<view class="search-history-container">
				<view class="search-history-item" v-for="(item, index) in searchHistories" :key="index">
					{{item}}
					<uni-icons type="closeempty" size="15" v-if="isDelete" @click="deleteSearchHistory(index)"></uni-icons>
				</view>
			</view>
		</view>
		<view class="search-no-result" v-else>
			没有搜索结果
		</view>
	</view>
</template>

<script>
	import {searchListApi} from "../../../api/goods.js"
	import {debounce} from '../../../utils/lodash.js'
	export default {
		data() {
			return {
				kw: '', // 搜索内容
				searchResults: [],
				searchHistories: [],
				isDelete: false,
			};
		},
		methods: {
			// 根据输入获取推荐列表
			input: debounce(function(e) {
				searchListApi(this.kw).then(res => {
					this.searchResults = res;
					this.pushToHistory();
				})
			},800),
			// 跳转到商品详情页
			goDetailList(item) {
				uni.navigateTo({
					url: '/pages/goods/details/details?goods_id=' + item.goods_id,
				})
			},
			pushToHistory() {
				const history = this.searchHistories;
				const _kw = this.kw;
				if(_kw.length) {
					if(history.includes(_kw)) {
						const i = history.indexOf(_kw);
						history.splice(i,1);
					}
					history.unshift(_kw);
				}
			},
			// 清除历史记录
			handleSearchHistory() {
				this.isDelete = true;
			},
			deleteComplete() {
				this.isDelete = false;
			},
			clearHistory() {
				this.searchHistories = [];
			},
			deleteSearchHistory(index) {
				this.searchHistories.splice(index,1);
			}
 		},
		computed: {
			historys() {
				return [...this.searchHistories];
			}
		}
	}
</script>

<style lang="scss" scoped>
.serach-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.search-list {
	display: flex;
	flex-direction:  column;
	.search-list-item {
		height: 40px;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-bottom: 1px solid #efe5e5 ;
		align-items: center;
		.search-item-container {
			font-size: 15px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			padding-left: 15rpx;
		}
	}
}
.search-history {
	display: flex;
	flex-direction: column;
	.search-history-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		height: 60rpx;
		border-bottom: 1px solid #efe5e5 ;
		position: relative;
	}
	.search-history-container {
		display: flex;
		flex-wrap: wrap;
		margin: 10rpx 20rpx;
		.search-history-item {
			display: flex;
			font-size: 15px;
			padding: 5px 5px;
			background-color: #efe4de;
			margin: 5px 5px; 
		} 
	}
}
.delete-history-box {
	display: flex;
	font-size: 15px;
	.delete-all-history {
		margin-right: 10px;
	}
	.delete-complete {
		margin-left: 10px;
		color: #aaaa00;
	}
}
</style>
