<template>
	<view class="index-block" v-show="list.length>0">
		<view class="title red">{{label}}</view>
		<view class="list">
			<view
				v-for="item in list"
				:key="item.id"
				@click="toDetail(item.id)"
			>
				<goods
					:name="item.name"
					:pic="item.picture"
					:price="item.price"
				/>
			</view>
		</view>
	</view>
</template>

<script>
import Goods from '../../components/Goods/Goods'

export default {
	name: 'IndexCard',
	components: {
		Goods
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		list: {
			type: Array,
			default () {
				return []
			}
		}
	},
	methods: {
		toDetail(id){
			this.$to(`/pages/goodsDetail/goodsDetail?id=${id}`)
		}
	}
}
</script>

<style lang="less" scoped>
.index-block {
	padding: 40rpx 0;

	.title {
		text-align: center;
		font-weight: bold;
		font-size: 32rpx;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 12rpx;

		>view {
			width: 50%;
			padding: 32rpx 16rpx;
		}
	}
}
</style>
