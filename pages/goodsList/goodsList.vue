<template>
	<view class="goods-list">
		
		<view class="goods-search" v-show="searchShow">
			<view class="search-box">
				<text class="l">商品</text>
				<view class="m">
					<text class="iconfont iconsousuo" />
					<input
						type="text"
						v-model="query.keyword"
						placeholder-class="search-default"
						placeholder="请输入搜索关键字"
					/>
				</view>
				<text class="r" @click="onSearch">搜索</text>
			</view>
			<view class="block">
				<view class="title">最近搜索</view>
				<view class="list">
					<text
						v-for="item in history"
						:key="item"
						@click="onSearch('click',item)"
					>
						{{item}}
					</text>
				</view>
			</view>
			<view class="block">
				<view class="title">热门搜索</view>
				<view class="list">
					<text
						:class="{red:index<3}"
						v-for="(item, index) in hotSearch"
						:key="item"
						@click="onSearch('click',item)"
					>
						{{item}}
					</text>
				</view>
			</view>
		</view>
		
		<view class="search-wrap">
			<view class="search-box">
				<text class="l">商品</text>
				<view class="m" @click="searchShow = true">
					<text class="iconfont iconsousuo" />
					<input
						type="text"
						v-model="query.keyword"
						placeholder-class="search-default"
						placeholder="请输入搜索关键字"
					/>
				</view>
				<text class="r" @click="onSearch">搜索</text>
			</view>
		</view>
		
		<view class="goods-cont" v-show="!searchShow">
			<navigator
				v-for="item in goodsList"
				:key="item.id"
				:url="`/pages/goodsDetail/goodsDetail?id=${item.id}`"
			>
				<goods-row
					:name="item.name"
					:pic="item.picture"
					:price="item.price"
				>
					<view slot="m">{{item.sketch}}</view>
					<view slot="br">已售: {{item.total_sales}}</view>
				</goods-row>
			</navigator>
		</view>
		<view class="no-more" v-show="!nextPage">没有更多了~</view>
	</view>
</template>

<script>
import GoodsRow from '../../components/Goods/GoodsRow'
import { getGoodsList } from '../../utils/api'
import { getStore, setStore } from '../../utils/index'
export default {
	name: 'goodsList',
	components: { GoodsRow },
	data() {
		return {
			searchShow: true,
			history: getStore('history') || [],
			hotSearch: getStore('hotSearch') || [],
			nextPage: true,
			query: {
				keyword: '',
				cate_id: '',
				page: 1
			},
			goodsList: []
		};
	},
	onLoad({id}){
		if(id){
			this.query.cate_id = id
			this.searchShow = false
		}
		this.getList()
	},
	onReachBottom(){
		if(this.nextPage){
			this.query.page++
			this.getList()
		}
	},
	methods: {
		onSearch(ev, val){
			ev == 'click' && (this.query.keyword = val)
			const { keyword } = this.query
			if(keyword && !this.history.includes(keyword)){
				this.history.unshift(keyword)
				setStore('history', this.history)
			}
			this.goodsList = []
			this.nextPage = true
			this.query.page = 1
			this.searchShow = false
			this.getList()
		},
		getList(){
			getGoodsList(this.query).then(res=>{
				this.goodsList = [...this.goodsList, ...res.data]
				if(res.data.length < 12){
					this.nextPage = false
				}
			})
		}
	}
}
</script>

<style lang="less">
.search-default{
	font-size: 28rpx;
}
.search-box{
	display: flex;
	justify-content: space-between;
	padding-bottom: 20rpx;
	.m{
		width: 540rpx;
		display: flex;
	}
	input{
		margin-left: 12rpx;
	}
}
.goods-search{
	height: 100vh;
	background: #fff;
	position: fixed;
	let: 0;
	top: 0;
	/* #ifdef H5 */
	top: 88rpx;
	/* #endif */
	z-index: 9;
	padding: 0 32rpx;
	.block{
		padding: 20rpx 0;
		.title{
			padding-bottom: 20rpx;
		}
		.list{
			display: flex;
			flex-wrap: wrap;
			text{
				margin: 0 32rpx 20rpx 20rpx;
				font-size: 24rpx;
			}
		}
	}
}
.search-wrap{
	width: 100%;
	padding: 0 32rpx;
	position: fixed;
	left: 0;
	top: 0;
	/* #ifdef H5 */
	top: 88rpx;
	/* #endif */
	z-index: 8;
	background: #fff;
}
.goods-cont{
	padding:  44rpx 16rpx 0;
}
</style>
