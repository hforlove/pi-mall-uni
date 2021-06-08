<template>
	<view>
		
		<swiper class="index-swiper" autoplay indicator-dots circular>
		  <swiper-item v-for="item in swiperList" :key="item.id">
		    <image :src="item.cover" />
		  </swiper-item>
		</swiper>
	
		<view class="index-nav">
		  <navigator
				v-for="item in navList"
				:key="item.id"
				:url="`/pages/goodsList/goodsList?id=${item.id}`"
			>
				<image :src="item.cover" />
				<text>{{item.title}}</text>
		  </navigator>
		</view>
		
		<swiper class="index-notice" vertical autoplay>
		  <swiper-item v-for="item in noticeList" :key="item.id">
		    <view>
					<text class="iconfont icontongzhi"></text>
					{{item.title}}
		    </view>
		  </swiper-item>
		</swiper>
		
		<index-card :list="newList" label="新品" />
		<index-card :list="hotList" label="热卖" />
		<index-card :list="recommenList" label="推荐" />
		
		<!-- <fab /> -->
		
	</view>
</template>

<script>
import IndexCard from './IndexCard'
import { getHomeData } from '../../utils/api'
import { setStore, setCart } from '../../utils/index'
export default {
	components: { IndexCard },
	data() {
		return {
			swiperList:[],
			navList:[],
			noticeList:[],
			newList:[],
			hotList:[],
			recommenList:[]
		};
	},
	onNavigationBarSearchInputClicked(){
		this.$to('/pages/goodsList/goodsList')
	},
	onShow(){
		setCart()
	},
	onLoad(){
		getHomeData().then(res=>{
			const data = res.data
			this.swiperList = data.adv.index_top
			this.navList = data.cate
			this.noticeList = data.announce
			this.newList = data.product_new
			this.hotList = data.product_hot
			this.recommenList = data.product_recommend
			setStore('hotSearch',data.search.hot_search_list)
		})
	}
}
</script>

<style lang="less">
.index-swiper{
  height: 340rpx;
  image{
    width: 100%;
    height: 100%;
  }
}
.index-nav{
  display: flex;
  padding: 40rpx 0;
  navigator{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image{
      width: 100rpx;
      height: 100rpx;
    }
    text{
      font-size: 24rpx;
    }
  }
}
.index-notice{
  height: 80rpx;
  swiper-item{
    view{
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      font-size: 28rpx;
      color: #ed6a0c;
    }
    .iconfont{
			margin-right: 12rpx;
		}
  }
}
</style>
