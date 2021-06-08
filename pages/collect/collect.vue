<template>
	<view>
		<uni-swipe-action v-for="item in collectList" :key="item.id">
			<uni-swipe-action-item :right-options="options" @click="onDelete(item.id)">
				<goods-row
					@onClick="$to(`/pages/goodsDetail/goodsDetail?id=${item.product.id}`)"
					:name="item.product.name"
					:pic="item.product.picture"
					:price="item.product.minPriceSku.price"
				/>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<view class="no-more" v-show="!nextPage">没有更多了~</view>
	</view>
</template>

<script>
import GoodsRow from '../../components/Goods/GoodsRow'
import { getCollection, deleteCollect } from '../../utils/api'
export default {
	name: 'collect',
	components: { GoodsRow },
	data() {
		return {
			options:[
				{
					text: '删除',
					style: {
							backgroundColor: '#dd524d'
					}
				}
			],
			collectList: [],
			page: 1,
			nextPage: true
		}
	},
	onLoad(){
		this.getCollect()
	},
	onReachBottom() {
		if(this.nextPage){
			this.page++
			this.getCollect()
		}
	},
	methods: {
		onDelete(id){
			deleteCollect(id).then(res=>{
				const index = this.collectList.findIndex(item=>item.id == id)
				this.collectList.splice(index,1)
			})
		},
		getCollect(){
			getCollection({page: this.page}).then(res=>{
				this.collectList = [...this.collectList, ...res.data]
				this.nextPage = res.data.length == 10
			})
		}
	}
}
</script>

<style>

</style>
