<template>
	<view>
		
		<view class="order-tabs">
			<view class="tab" v-for="item in tabs" :key="item.id">
				<text
					:class="{act:item.id == tabIndex}"
					@click="onChange(item.id)"
				>
					{{item.label}}
				</text>
			</view>
		</view>
		
		<view class="order-main">
		  <view class="order-row" v-for="item in orderList" :key="item.id">
		    <view class="top">
		      <text>订单号：{{item.order_sn}}</text>
		      <text class="red">{{orderStatus[item.order_status]}}</text>
		    </view>
		    <view class="list">
		      <goods-row
						v-for="child in item.product"
						:key="child.id"
		        :price="child.price"
		        :pic="child.product_picture"
		        :name="child.product_name"
		      >
		        <view slot="m">{{child.sku_name}}</view>
		        <view slot="br">x{{child.num}}</view>
		      </goods-row>
		    </view>
		    <view class="tips">
		      共<text> {{item.product_count}} </text>件商品 实付款 ￥<text>{{item.pay_money}}</text>
		    </view>
		    <view class="btn">
		      <button
		        v-if="item.order_status == 0"
		        size="mini"
		        type="default"
		        @click="onCancel(item.id)"
		      >
		        取消订单
		      </button>
		      <button
		        v-if="item.order_status == -4"
		        size="mini"
		        type="default"
		        @click="onDelete(item.id)"
		      >
		        删除订单
		      </button>
		      <button
		        size="mini" 
		        type="warn"
		        @click="$to(`/pages/orderDetail/orderDetail?id=${item.id}`)"
		      >
		        订单详情
		      </button>
		      <button
		        v-if="item.order_status == 0 || item.order_status == 202"
		        size="mini" 
		        type="warn"
		        @click="onPay(item.id)"
		      >
		        立即支付
		      </button>
		      <button
		        v-if="item.order_status == 2"
		        size="mini" 
		        type="warn"
		        @click="onReceive(item.id)"
		      >
		        确认收货
		      </button>
		    </view>
		  </view>
		</view>
		
		<view class="no-more" v-show="!nextPage">没有更多了~</view>
		
	</view>
</template>

<script>
import GoodsRow from '../../components/Goods/GoodsRow'
import { getOrder, deleteOrder, closeOrder, deliveryOrder } from '../../utils/api'
import { orderStatus } from '../../utils/config'
export default {
	name: 'order',
	components: { GoodsRow },
	data() {
		return {
			orderStatus,
			tabIndex: '-1',
			tabs: [
				{ id: '-1', label: '全部'},
				{ id: '0', label: '代付款'},
				{ id: '1', label: '待发货'},
				{ id: '2', label: '待收货'},
				{ id: '3', label: '评价'},
			],
			query: {
				page: 1,
				state: ''
			},
			orderList: [],
			nextPage: true
		}
	},
	onLoad({state}){
		if(state){
			this.tabIndex = state
			this.query.state = state
		}
		this.getOrder()
	},
	onReachBottom() {
		if(this.nextPage){
			this.query.page++
			this.getOrder()
		}
	},
	methods: {
		onChange(id){
			this.tabIndex = id
			this.query.page = 1
			this.query.state = id
			this.orderList = []
			this.nextPage = true
			this.getOrder()
		},
		onDelete(id){
			deleteOrder(id).then(res=>{
				const index = this.orderList.findIndex(item=>item.id == id)
				this.orderList.splice(index,1)
			})
		},
		onReceive(id){
			deliveryOrder(id).then(res=>{
				const index = this.orderList.findIndex(item=>item.id == id)
				this.orderList[index].order_status = 3
			})
		},
		onCancel(id){
			closeOrder(id).then(res=>{
				const index = this.orderList.findIndex(item=>item.id == id)
				this.orderList[index].order_status = -4
			})
		},
		onPay(id){
			this.$to(`/pages/pay/pay?id=${id}`)
		},
		getOrder(){
			const { page, state } = this.query
			const params = {
				synthesize_status: state > -1 ? state : '',
				page
			}
			getOrder(params).then(res=>{
				this.orderList = [...this.orderList, ...res.data]
				if(res.data.length < 10) this.nextPage = false
			})
		}
	}
}
</script>

<style lang="less">
.order-tabs{
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	/* #ifdef H5 */
	top: 88rpx;
	/* #endif */
	width: 100%;
	z-index: 8;
	background-color: #fff;
	.tab{
		flex: 1;
		display: flex;
		justify-content: center;
		text{
			display: inline-block;
			height: 88rpx;
			line-height: 88rpx;
			padding: 0 4rpx;
		}
		.act{
			border-bottom: 6rpx solid #FB0017;
		}
	}
}
.order-main{
  padding-top: 90rpx;
}
.order-row{
  padding: 0 32rpx 52rpx;
  .top{
    display: flex;
    justify-content: space-between;
    padding: 12rpx 0;
  }
  .list{
    padding: 0 12rpx;
  }
  .tips{
    text-align: right;
    font-size: 24rpx;
    color: gray;
  }
  .btn{
    text-align: right;
    padding: 10px 0;
    button{
      margin: 0 4rpx;
			font-size: 24rpx;
			padding: 0 16rpx;
    }
  }
}
</style>
