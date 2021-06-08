<template>
	<view>
		
		<view class="order-address">
			<view class="icon">
				<text class="iconfont icondizhi" />
			</view>
			<view class="info">
				<addr
					v-if="order.receiver_name"
					:name="order.receiver_name"
					:mobile="order.receiver_mobile"
					:address="`${order.receiver_region_name} ${order.receiver_address}`"
				/>
			</view>
		</view>
		
		<view class="order-list">
		  <goods-row
				v-for="item in order.product"
				:key="item.id"
		    :name="item.product_name"
		    :price="item.price"
		    :pic="item.product_picture"
		  >
		    <view slot="m">{{item.sku_name}}</view>
		    <view slot="br">x{{item.num}}</view>
		  </goods-row>
		</view>
		
		<view class="order-step">
			<uni-steps :options="steps" :active="active" />
		</view>

		<view class="info-row">
			<text>订单状态</text>
			<text class="red">{{orderStatus[order.order_status]}}</text>
		</view>
		<view class="info-row">
			<text>订单号</text>
			<text>{{order.order_sn}}</text>
		</view>
		<view class="info-row">
			<text>配送方式</text>
			<text class="red">{{order.shipping_explain}}</text>
		</view>
		<view class="info-row">
			<text>支付方式</text>
			<text class="red">{{order.payment_explain}}</text>
		</view>
		<view class="info-row">
			<text>实付金额</text>
			<text class="red">￥{{order.pay_money}}</text>
		</view>
		
	</view>
</template>

<script>
import Addr from '../../components/Addr/Addr'
import GoodsRow from '../../components/Goods/GoodsRow'
import { getOrderDetail } from '../../utils/api'
import { orderStatus } from '../../utils/config'
export default {
	name: 'orderDetail',
	components: { GoodsRow, Addr },
	data() {
		return {
			orderStatus,
			active: 1,
			steps: [
				{ title: '订单创建' },
				{ title: '订单支付'  },
				{ title: '卖家发货' },
				{ title: '买家收货' }
			],
			order: {}
		}
	},
	onLoad({id}){
		this.getOrder(id)
	},
	methods: {
		getOrder(id){
			getOrderDetail(id).then(res=>{
				this.order = res.data
				this.setSteps()
			})
		},
		setSteps(){
			let active = 0
			switch (this.order.order_status) {
				case '0':
					active = 0
					break;
				case '1':
					active = 1
					break;
				case '2':
					active = 2
					break;
				case '3':
					active = 3
					break;
				case '4':
					active = 4
					break;
				default:
					active = 0
					break;
			}
			this.active = active
		},
	}
}
</script>

<style lang="less">
.order-step{
	padding: 40rpx 0;
}
.info-row{
  display: flex;
  justify-content: space-between;
  padding: 24rpx 40rpx;
  color: gray;
}
</style>
