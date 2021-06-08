<template>
	<view>
		
		<view class="order-address" @click="onChoseAddress">
			<view class="icon">
				<text class="iconfont icondizhi" />
			</view>
			<view class="info">
				<addr
					v-if="address.id"
					:name="address.realname"
					:mobile="address.mobile"
					:address="`${address.address_name} ${address.address_details}`"
				/>
				<view v-else>请选择收货地址</view>
			</view>
			<view class="icon">
				<text class="iconfont iconjiantou" />
			</view>
		</view>
		<view class="order-list">
			<view
				v-for="item in orderList"
				:key="item.id"
			>
				<goods-row
					:name="item.product_name"
					:price="item.price"
					:pic="item.product_picture"
				>
					<view slot="m">{{item.sku_name}}</view>
					<view slot="br">x{{item.num}}</view>
				</goods-row>
			</view>
		</view>
		<submit-bar :price="price" @onSubmit="onSubmit" />
	</view>
</template>

<script>
import Addr from '../../components/Addr/Addr'
import SubmitBar from '../../components/SubmitBar/SubmitBar'
import GoodsRow from '../../components/Goods/GoodsRow'
import { getOrderPreview, createOrder, getCartNum } from '../../utils/api'
import { getStore, setStore, removeStore, toast, setCart } from '../../utils/index'
export default {
	components: { Addr, SubmitBar, GoodsRow },
	data() {
		return {
			address: {},
			orderList: []
		}
	},
	computed: {
		price(){
			return this.orderList.reduce((prev,cur) => prev + cur.num * cur.price, 0)
		}
	},
	onLoad(payload){
		console.log(payload);
		this._params = payload
		this.getOrder(payload)
	},
	onShow(){
		const address = getStore('address')
		if(address){
			this.address = address
			removeStore('address')
		}
	},
	methods: {
		onChoseAddress(){
			uni.navigateTo({
				url: '/pages/address/address'
			})
		},
		onSubmit(){
			if(!this.address.id){
				toast('请选择收货地址', true)
				return
			}
			this.createOrder()
		},
		getOrder(payload){
			const { type, ids, num } = payload
			const params = {
				type,
				data: num ? `{"sku_id":${ids},"num":${num}}` : ids
			}
			getOrderPreview(params).then(res=>{
				this.orderList = res.data.products
				this.address = res.data.address || {}
			})
		},
		createOrder(){
			const { type, ids, num } = this._params
			const params = {
				address_id: this.address.id,
				buyer_message: '',
				data: num ? `{"sku_id":${ids},"num":${num}}` : ids,
				shipping_type: 1,
				type
			}
			createOrder(params).then(res=>{
				getCartNum().then(res=>{
					setStore('cart',res.data)
					setCart()
				})
				this.$to(`/pages/pay/pay?id=${res.data.id}`)
			})
		}
	}
}
</script>

<style lang="less">
.order-list{
	padding-bottom: 120rpx;
}
</style>
