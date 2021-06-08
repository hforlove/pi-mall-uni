<template>
	<view class="address-bar">
		<view class="icon">
			<uni-icons type="location" />
		</view>
		<view class="info">
			<Addr name="zhangheng" mobile="12345678912" address="sdf asdf sad fasdf sdf sd ">
		</view>
		<view class="icon">
			<uni-icons type="arrowright" />
		</view>
	</view>
</template>

<script>
import Addr from './Addr'
export default {
	name:"AddressBar",
	components: { Addr },
	props: {
		show: {
			type: Boolean,
			default: true
		},
		name: {
			type: String,
			default: ''
		},
		mobile: {
			type: String,
			default: ''
		},
		address: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="less">
.address-bar{
	display: flex;
}
</style>
