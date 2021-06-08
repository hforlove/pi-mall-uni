<template>
	<view class="category">

		<view class="left">
			<scroll-view scroll-y enhanced :show-scrollbar="false">
				<view class="box">
					<text :class="{red:item.id == currentId}" v-for="item in parentList" :key="item.id"
						@click="currentId = item.id">{{item.title}}</text>
				</view>
			</scroll-view>
		</view>

		<view class="right">
			<scroll-view scroll-y enhanced :show-scrollbar="false">
				<view class="box">
					<view class="block" v-for="item in childList" :key="item.id">
						<navigator class="title" :url="`/pages/goodsList/goodsList?id=${item.id}`">
							<cell>{{item.title}}</cell>
						</navigator>
						<view class="items">
							<navigator
								class="item"
								v-for="child in item.child"
								:key="child.id"
								:url="`/pages/goodsList/goodsList?id=${child.id}`"
							>
								<image :src="child.cover" />
								<text>{{child.title}}</text>
							</navigator>
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
import Cell from '../../components/Cell/Cell'
import { getCategory } from '../../utils/api'
import { setCart } from '../../utils/index'
export default {
	name: 'category',
	components: { Cell },
	data() {
		return {
			parentList: [],
			currentId: ''
		};
	},
	onNavigationBarButtonTap(ev) {
		if(ev.type == 'back'){
			uni.switchTab({
				url: '/pages/index/index'
			})
		}else{
			this.$to('/pages/goodsList/goodsList')
		}
	},
	computed: {
		childList() {
			const child = this.parentList.find(item => item.id == this.currentId)
			return child ? child.child : []
		}
	},
	onShow(){
		setCart()
	},
	onLoad() {
		getCategory().then(res => {
			this.parentList = res.data
			this.currentId = res.data[0].id
		})
	}
}
</script>

<style lang="less">
.category {
	display: flex;
	height: calc(100vh - 190rpx);

	scroll-view {
		height: 100%;
	}

	.left {
		width: 172rpx;

		.box {
			display: flex;
			flex-direction: column;

			text {
				padding: 24rpx 0;
				font-size: 28rpx;
				text-align: center;
			}
		}
	}

	.right {
		flex: 1;

		.items {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0
		}

		.block {
			padding: 24rpx;
		}

		.item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-bottom: 20rpx;
			image {
				width: 152rpx;
				height: 152rpx;
			}

			text {
				font-size: 24rpx;
				text-align: center;
			}
		}
	}
}
</style>
