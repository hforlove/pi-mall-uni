<template>
	<view>
		<view class="goods">
			<image class="img" :src="pic" />
			<text class="name">{{name}}</text>
			<text class="red">￥{{price}}</text>
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
.goods{
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .img{
    width: 100%;
    height: 344rpx;
  }
  .name{
    margin: 12rpx 0;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 24rpx;
  }
}
</style>
