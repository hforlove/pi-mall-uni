<template>
	<view class="goods-row" @click="$emit('onClick')">
		<image class="img" :src="pic" />
		<view class="int">
			<view class="title">{{name}}</view>
			<view class="m">
				<slot name="m"></slot>
			</view>
			<view class="br">
				<slot name="br"></slot>
			</view>
			<view class="price">￥{{price}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pic: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			price: {
				type: [String, Number],
				default: 0
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.goods-row{
  display: flex;
  padding: 24rpx 32rpx;
  .img{
    width: 196rpx;
    height: 196rpx;
  }
  .int{
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    padding-left: 20rpx;
  }
  .title{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price{
    color: #FB0017;
  }
  .m{
    font-size: 24rpx;
    color: gray;
  }
  .br{
    position: absolute;
    right: 0;
    bottom: 0;
    color: gray;
    font-size: 24rpx;
  }
}
</style>
