	import {getList} from "../utils/utils.js"
	
	/**
	 * 获取分类列表数据
	 */
	export const sortListApi = () => {
	  return getList("/api/public/v1/categories");
	};
	
	/**
	 * 获取首页轮播图
	 */
	export const swiperApi = () => {
	  return getList("/api/public/v1/home/swiperdata");
	};
	
	/**
	 * 获取首页导航栏
	 */
	export const navListApi = () => {
	  return getList("/api/public/v1/home/catitems");
	};
	
	/**
	 * 获取首页楼层数据
	 */
	export const floorListApi = () => {
	  return getList("/api/public/v1/home/floordata");
	};
	
	/**
	 * 获取搜索提示列表
	 */
	export const searchListApi = (search) => {
	  return getList("/api/public/v1/goods/qsearch", `${search}`);
	};