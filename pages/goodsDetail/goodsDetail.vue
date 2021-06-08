<template>
	<view class="goods-detail">
	
		<swiper class="goods-swiper" autoplay indicator-dots circular>
			<swiper-item v-for="item in detail.covers" :key="item">
				<image :src="item" />
			</swiper-item>
		</swiper>
		
		<view class="goods-info">
			<view class="title">
				<text class="l">{{detail.name}}</text>
				<view class="r">
					<view class="red" v-show="detail.myCollect">
						<text class="iconfont iconpingjia2" />
						收藏
					</view>
					<view class="gray" v-show="!detail.myCollect">
						<text class="iconfont iconpingjia1" />
						收藏
					</view>
				</view>
			</view>
			<view class="tips">
				<view>
					<text class="red">￥{{detail.price}}</text>
					<text class="gray">￥{{detail.market_price}}</text>
				</view>
				<text class="gray">月销：{{detail.total_sales}}</text>
			</view>
			<view class="cell">
				<view class="l">选择</view>
				<view class="r" @click="onOpen('popupSku')">
					<cell>商品规格</cell>
				</view>
			</view>
			<view class="cell" v-if="detail.tags&&detail.tags.length>0">
				<view class="l">服务</view>
				<view class="r" @click="onOpen('popupService')">
					<cell>{{detail.tags[0]}}</cell>
				</view>
			</view>
			<view class="cell">
				<view class="l">评价</view>
				<view class="r">
					<cell><view class="tr">好评率{{detail.match_ratio}}%</view></cell>
				</view>
			</view>
			<view class="line">商品详情</view>
			<view class="detail">
				<rich-text :nodes="detail.intro"></rich-text>
			</view>
		</view>
		
		<view class="goods-nav">
			<uni-goods-nav
				:fill="true" 
				:options="options"
				:buttonGroup="buttonGroup"
				@buttonClick="onOpen('popupSku')"
				@click="onClick"
			/>
		</view>
		
		<uni-popup ref="popupService" type="bottom" background-color="#fff">
			<view class="goods-service">
				<text v-for="item in detail.tags" :key="item">{{item}}</text>
			</view>
		</uni-popup>
		
		<uni-popup ref="popupSku" type="bottom">
			<view class="goods-select">
				<sku :sku="detail" @onClose="onClose" @onSubmit="onSubmit" />
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
import Cell from '../../components/Cell/Cell'
import Sku from '../../components/Sku/Sku'
import { getGoodsDetail, addCart, getCartNum, createCollect, deleteCollect } from '../../utils/api'
import { getStore, setStore, toast } from '../../utils/index'
export default {
	components: { Cell, Sku },
	data() {
		return {
			detail: {},
			options: [
				{ icon: 'headphones', text: '客服' },
				{ icon: 'cart', text: '购物车', info: getStore('cart') || 0 },
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	onLoad({id}){
		this._goodsId = id
		getGoodsDetail(id).then(res=>{
      res.data.intro = res.data.intro.replace(/style="/g, 'style="width:100%')
      res.data.intro = res.data.intro.replace(/<img /g, '<img style="width:100%; height: auto;" ')
			this.detail = res.data
		})
	},
	methods: {
		onOpen(type){
			this.$refs[type].open()
		},
		onClose(){
			this.$refs.popupSku.close()
		},
		onClick({index}){
			if(index == 1) uni.switchTab({url:'/pages/cart/cart'})
		},
		onSubmit(data){
			const { type, sku_id, num } = data
			if(type == 'cart') this.addCart({sku_id, num })
			if(type == 'buy') this.$to(`/pages/orderCreate/orderCreate?type=buy_now&ids=${sku_id}&num=${num}`)
		},
		onCollect(){
			if(this.detail.myCollect){
				this.deleteCollect(this.detai)
			}else{
				this.createCollect()
			}
		},
		addCart(params){
			addCart(params).then(res=>{
				getCartNum().then(res=>{
					setStore('cart',res.data)
					this.options[1].info = res.data
					this.onClose()
				})
			})
		},
		createCollect(){
			const params = {
				topic_id: this._goodsId,
				topic_type: "product"
			}
			createCollect(params).then(res=>{
				toast('已收藏')
				this.detail.myCollect = res.data
			})
		},
		deleteCollect(){
			deleteCollect(this.detail.myCollect.id).then(res=>{
				this.detail.myCollect = null
			})
		}
	}
}
</script>

<style lang="less">
.goods-swiper {
  height: 750rpx;
	image {
	  width: 100%;
	  height: 100%;
	}
}
.goods-nav{
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 8;
}
.goods-info{
  padding: 20rpx 32rpx 120rpx;
  .title{
    display: flex;
    align-items: center;
    .l{
      flex: 1;
      padding-right: 10rpx;
      line-height: 36rpx;
      font-weight: bold;
    }
    .r{
      width: 80rpx;
			view{
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
			}
    }
  }
  .tips{
    display: flex;
    padding: 20rpx 0;
    justify-content: space-between;
    >view{
      font-size: 32rpx;
      text:last-child{
        font-size: 24rpx;
        text-decoration: line-through;
      }
    }
    >text{
      font-size: 24rpx;
    }
  }
	.line{
		text-align: center;
		padding: 20rpx;
	}
	.cell{
		display: flex;
		align-items: center;
		padding: 12rpx 0;
		.l{
			width: 140rpx;
		}
		.r{
			flex: 1;
		}
	}
}
.goods-service{
	display: flex;
	flex-direction: column;
	padding: 32rpx;
	text{
		padding: 20rpx 0;
		color: gray;
	}
}
.goods-select{
	border-radius: 40rpx 40rpx 0 0;
	overflow: hidden;
	background: #fff;
}
</style>
