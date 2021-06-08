<template>
	<view>
		
		<view class="pay-bar">
		  <view class="v1">支付金额</view>
		  <view class="v2">￥{{pay_money}}</view>
		</view>
		
		<view class="pay-type">
			<radio-group @change="onChange">
				<label class="radio" v-for="item in payList" :key="item.value">
					<text>{{item.label}}</text><radio :value="item.value" :checked="item.checked" />
				</label>
			</radio-group>
		</view>
		
		<button style="width: 80%;" type="warn" @click="onSubmit">确认支付</button>
		
	</view>
</template>

<script>
import { getOrderByPay, payOrder } from '../../utils/api'
import { toast } from '../../utils/index'
export default {
	data() {
		return {
			pay_money: 0,
			pay_type: 5,
			payList: [
				{ label:'微信支付', value: '1', checked: false },
				{ label:'支付宝支付', value: '2', checked: false },
				{ label:'预存款支付', value: '5', checked: true },
			]
		}
	},
	onLoad({id}){
		this._orderId = id
		this.getOrder(id)
	},
	methods: {
		onChange(ev){
			this.pay_type = ev.detail.value * 1
			console.log(this.pay_type);
		},
		onSubmit(){
			if(this.pay_type == 1 ){
				toast('暂不支持', true)
				return
			}
			const params = {
				data: `{"order_id": ${this._orderId}}`,
				order_group: 'order',
				pay_type: this.pay_type,
				trade_type: 'js'
			}
			this.payOrder(params)
		},
		getOrder(id){
			getOrderByPay({simplify:1, id}).then(res=>{
				this.pay_money = res.data.pay_money
			})
		},
		payOrder(params){
			payOrder(params).then(res=>{
				toast('支付成功')
				setTimeout(_=>{
					uni.switchTab({
						url: '/pages/profile/profile',
					})
				},1500)
			})
		}
	}
}
</script>

<style lang="less">
.pay-type{
	display: flex;
	flex-direction: column;
	padding: 60rpx 120rpx;
	label{
		display: flex;
		justify-content: space-between;
		padding: 12rpx;
	}
}
.pay-bar{
  position: relative;
  height: 460rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eb2f06;
  color: #fff;
  &::before,&::after{
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('https://pic.imgdb.cn/item/609b78cfd1a9ae528facc9b5.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .v1{
    font-size: 32rpx;
    padding-bottom:20rpx;
  }
  .v2{
    font-size: 54rpx;
  }
}
</style>
