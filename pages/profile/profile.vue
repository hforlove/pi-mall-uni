<template>
	<view>
		
		<view class="profile-bar">
		  <image class="head" :src="head_portrait" />
		  <text class="name">{{nickname}}</text>
		</view>
			
		<view class="profile-row">
			<cell class="cell" :islink="false">
				<text class="iconfont iconyinhangzhanghu" />
				<text class="label">我的账户</text>
			</cell>
			<view class="account">
				<view>
					<text class="red">{{account.user_money}}</text>
					<text>余额</text>
				</view>
				<view>
					<text class="red">{{coupon_num}}</text>
					<text>优惠券</text>
				</view>
				<view>
					<text class="red">{{account.user_integral}}</text>
					<text>积分</text>
				</view>
			</view>
		</view>
		<view class="profile-row">
			<cell class="cell" @onClick="$to('/pages/order/order')">
				<text class="iconfont icondingdan" />
				<text class="label">全部订单</text>
			</cell>
			<view class="block">
				<navigator class="item" url="/pages/order/order?state=0">
					<text class="iconfont icondaifukuan" />
					<text class="txt">待付款</text>
				</navigator>
				<navigator class="item" url="/pages/order/order?state=1">
					<text class="iconfont iconfahuo" />
					<text class="txt">待发货</text>
				</navigator>
				<navigator class="item" url="/pages/order/order?state=2">
					<text class="iconfont icondaishouhuo" />
					<text class="txt">待收货</text>
				</navigator>
				<navigator class="item" url="/pages/order/order?state=3">
					<text class="iconfont iconpingjiaguanli" />
					<text class="txt">评价</text>
				</navigator>
				<view class="item">
					<text class="iconfont iconshouhou" />
					<text class="txt">售后</text>
				</view>
			</view>
		</view>
		<view class="profile-row">
			<cell class="cell" :islink="false">
				<text class="iconfont iconfuwu" />
				<text class="label">我的服务</text>
			</cell>
			<view class="block">
				<navigator class="item" url="/pages/collect/collect">
					<text class="iconfont iconstar" />
					<text class="txt">我的收藏</text>
				</navigator>
				<view class="item">
					<text class="iconfont iconyouhuiquan" />
					<text class="txt">领劵中心</text>
				</view>
				<navigator class="item" url="/pages/address/address">
					<text class="iconfont icondizhi" />
					<text class="txt">我的地址</text>
				</navigator>
				<view class="item" @click="onLogout">
					<text class="iconfont icontuichu" />
					<text class="txt">退出</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Cell from '../../components/Cell/Cell'
import { getStore, removeStore, setCart } from "../../utils/index"
import { getUserDetail, logout } from '../../utils/api'
export default {
	name: 'profile',
	components: { Cell },
	data() {
		return {
			head_portrait: '',
			nickname: '',
			coupon_num: '',
			account: '',
			orderNum: ''
		};
	},
	onShow(){
		setCart()
	},
	onLoad() {
		getUserDetail().then(res=>{
			const { head_portrait, nickname, coupon_num, account, order_synthesize_num } = res.data
			this.head_portrait = head_portrait
			this.nickname = nickname
			this.coupon_num = coupon_num
			this.account = account
			this.orderNum = order_synthesize_num
		})
	},
	methods: {
		onLogout(){
			removeStore('token')
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	}
}
</script>

<style lang="less">
.profile-row{
	padding: 32rpx 40rpx;
	.cell{
		.iconfont{
			font-size: 40rpx;
			color: #FB0017;
		}
	}
	.label{
		padding-left: 12rpx;
		color: #333;
	}
	.block{
		display: flex;
		padding-top: 20rpx;
		.item{
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.iconfont{
				font-size: 40rpx;
				color: #FB0017;
			}
			.txt{
				font-size: 24rpx;
				padding-top: 8rpx;
			}
		}
	}
	.account{
		display: flex;
		padding-top: 20rpx;
		>view{
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		text{
			font-size: 24rpx;
		}
		.red{
			font-size: 28rpx;
			padding-bottom: 4rpx;
		}
		.cont{
			padding: 0 32rpx;
		}
	}
}
.profile-bar{
  position: relative;
  height: 440rpx;
  padding: 40rpx 40rpx 0;
  display: flex;
  align-items: center;
  background: #e55039;
  color: #fff;
  &::before,&::after{
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('https://pic.imgdb.cn/item/609b78cfd1a9ae528facc970.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .head{
    width: 124rpx;
    height: 124rpx;
    border-radius: 50%;
    overflow: hidden;
  }
  .name{
    font-size: 48rpx;
    padding: 0 20rpx;
  }
}
</style>
