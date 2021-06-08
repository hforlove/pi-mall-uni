<template>
	<view class="cell-row" @click="$emit('onClick')">
		<view class="cont"><slot></slot></view>
		<view class="icon" v-if="islink">
			<text class="iconfont iconjiantou" />
		</view>
	</view>
</template>

<script>
export default {
	name:"Cell",
	props: {
		islink: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style lang="less">
.cell-row{
	display: flex;
	justify-content: space-between;
	padding: 8rpx 0;
	.icon{
		display: flex;
		width: 60rpx;
		height: 100%;
		justify-content: center;
		align-items: center;
		.iconfont{
			color: #666;
			font-size: 32rpx;
		}
	}
	.cont{
		flex: 1;
		display: flex;
		align-items: center;
	}
}
</style>
