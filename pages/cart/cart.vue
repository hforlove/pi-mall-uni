<template>
	<view class="cart">
		<view class="cart-list">
			<uni-swipe-action v-for="item in cartList" :key="item.id">
				<uni-swipe-action-item :right-options="options" @click="onDelete(item.sku_id)">
					<view class="cart-item">
						<view class="l">
							<checkbox
								:checked="item.checked"
								@click="item.checked = !item.checked"
							/>
						</view>
						<view class="r">
							<goods-row
								:name="item.product_name"
								:pic="item.product_img"
								:price="item.price"
							>
								<view slot="m">{{item.sku_name}}</view>
								<view slot="br">
									<uni-number-box
										class="step"
										:min="1"
										v-model="item.number"
										@change="onChangeNum($event,item.sku_id)"
									/>
								</view>
							</goods-row>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<submit-bar :price="price" @onSubmit="onSubmit">
			<label class="cart-all">
				<checkbox :checked="allChecked" @click="onAllCheck" /><text>全选</text>
			</label>
		</submit-bar>
		<view class="no-more" v-show="cartList.length<1"></view>
	</view>
</template>

<script>
import GoodsRow from '../../components/Goods/GoodsRow'
import SubmitBar from '../../components/SubmitBar/SubmitBar'
import { getStore, setStore, setCart, toast } from '../../utils/index'
import { getCart, updateCart, deleteCart } from '../../utils/api'
export default {
	name: 'cart',
	components: { GoodsRow, SubmitBar },
	data() {
		return {
			checked: true,
			allChecked: true,
			cartList: [],
			options:[
				{
					text: '删除',
					style: {
							backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	computed: {
		price(){
			const checks = this.cartList.filter(item=>item.checked)
			this.allChecked = this.cartList.every(item=>item.checked)
			return checks.reduce((prev, cur) => {
				return prev + cur.number * cur.price
			}, 0)
		}
	},
	onShow(){
		setCart()
		this.getCart()
	},
	onLoad(){
		this.getCart()
	},
	methods:{
		onSubmit(){
			const ids = this.cartList.filter(item=>item.checked).map(item=>item.id)
			this.$to('/pages/orderCreate/orderCreate?type=cart&ids='+ids.join(','))
		},
		onAllCheck(){
			this.allChecked = !this.allChecked
			this.cartList.map(item=>{
				item.checked = this.allChecked
			})
		},
		onChangeNum(num,sku_id){
			updateCart({ sku_id, num }).then(res=>{}).catch(_=>{
				this.cartList.map(item=>{
					if(item.sku_id == sku_id) item.number = num - 1
				})
			})
		},
		onDelete(sku_id){
			const sku_ids = `[${sku_id}]`
			console.log(sku_ids);
			deleteCart({sku_ids}).then(res=>{
				const index = this.cartList.findIndex(item=>item.sku_id == sku_id)
				this.cartList.splice(index,1)
				const cartNum = getStore('cart') || 0
				setStore('cart', cartNum-1)
				setCart()
			})
		},
		getCart(){
			getCart().then(res=>{
				res.data.map(item=>{
					item.checked = true
				})
				this.cartList = res.data
				this._cartList = JSON.parse(JSON.stringify(this.cartList))
			})
		}
	}
}
</script>

<style lang="less">
.cart{
	padding-bottom: var(--window-bottom,110px);
}
.cart-all{
	position: relative;
	top: 8rpx;
	checkbox{
		transform: scale(0.7);
	}
}
.cart-item{
	display: flex;
	.l{
		display: flex;
		width: 80rpx;
		align-items: center;
		padding-left: 40rpx;
		transform: scale(0.7);
	}
	.r{
		flex: 1;
	}
	.step{
		transform: scale(0.8);
		transform-origin: right bottom;
	}
}
</style>
