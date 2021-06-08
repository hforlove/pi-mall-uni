<template>
	<view class="submit-bar">
		<view class="left">
			<slot></slot>
		</view>
		<view class="right">
			<text class="txt">合计:</text>
			<view class="red"><text class="pre">￥</text><text>{{price.toFixed(2)}}</text></view>
			<button class="btn" @click="onSubmit">提交订单</button>
		</view>
	</view>
</template>

<script>
export default {
	name:"SubmitBar",
	props: {
		price: {
			type: [Number, String],
			default: 0
		}
	},
	methods: {
		onSubmit(){
			this.$emit('onSubmit')
		}
	}
}
</script>

<style lang="less">
.submit-bar{
	width: 100%;
	display: flex;
	padding: 20rpx 32rpx;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	left: 0;
	bottom: var(--window-bottom,0);
	background-color: #fff;
	z-index: 9;
	.right,.left{
		display: flex;
		align-items: center;
	}
	.btn{
		background: #ee0a24;
		color: #fff;
		border-radius: 40rpx;
		height: 72rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40rpx;
	}
	.red{
		font-size: 36rpx;
		padding: 0 20rpx;
	}
	.pre{
		font-size: 24rpx;
	}
}
</style>
