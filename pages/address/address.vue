<template>
	<view class="address-list">
		<view
			class="rows"
			v-for="item in addressList"
			:key="item.id"
		>
			<view class="l" @click="onChose(item)">
				<Addr
					:is-default="item.is_default!=0"
					:name="item.realname" 
					:mobile="item.mobile"
					:address="`${item.address_name} ${item.address_details}`" />
			</view>
			<view class="r" @click="onEdit(item.id)">
				<text class="iconfont iconbianjimian" />
			</view>
		</view>
		<button class="address-add" @click="onCreate">新增地址</button>
	</view>
</template>

<script>
import Addr from '../../components/Addr/Addr'
import { getAddress } from '../../utils/api'
import { setStore } from '../../utils/index'
export default {
	components: { Addr },
	data() {
		return {
			addressList: []
		};
	},
	onShow(){
		this.getAddress()
	},
	methods: {
		onEdit(id){
			this.$to(`/pages/addressEdit/addressEdit?id=${id}`)
		},
		onCreate(){
			this.$to('/pages/addressEdit/addressEdit')
		},
		onChose(address){
			setStore('address',address)
			uni.navigateBack()
		},
		getAddress(){
			getAddress().then(res=>{
				this.addressList = res.data
			})
		}
	}
}
</script>

<style lang="less">
.address-list{
	padding-bottom: 120rpx;
	.rows{
		padding: 16rpx 32rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #F1F1F1;
		.r{
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			width: 80rpx;
		}
		.l{
			flex: 1;
		}
	}
}
.address-add{
	position: fixed;
	bottom: var(--window-bottom,0);
	left: 6%;
	width: 88%;
	background: #ee0a24;
	color: #fff;
	font-size: 28rpx;
	padding: 12rpx 0;
}
</style>
