<template>
	<view class="address">
		<view class="info">
			<text>{{name}}</text>
			<text class="mobile">{{mobile}}</text>
			<text class="d" v-if="isDefault">默认</text>
		</view>
		<view class="detail">
			<text>{{address}}</text>
		</view>
	</view>
</template>

<script>
export default {
	name:"Addr",
	props: {
		isDefault: {
			type: Boolean,
			default: false
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
	},
	data() {
		return {
			
		};
	}
}
</script>

<style lang="less">
.address{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.info{
		padding-bottom: 12rpx;
	}
	.mobile{
		padding: 0 12rpx;
	}
	.d{
		background: #FB0017;
		color: #fff;
		display: inline-block;
		border-radius: 4rpx;
		font-size: 24rpx;
		padding: 0 8rpx;
	}
}
</style>
