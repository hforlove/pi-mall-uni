<template>
	<view>
		<view class="login-top">
			<text>Hi~</text>
			<text>PI商城欢迎你</text>
		</view>
		<view class="login-bottom">
			<view class="inner">
				  <uni-forms :value="formData" ref="form">
						<uni-forms-item label="手机" name="mobile">
								<uni-easyinput type="text" v-model="formData.mobile" placeholder="请输入手机" />
						</uni-forms-item>
						<uni-forms-item label="密码" name="password">
								<uni-easyinput type="text" v-model="formData.password" placeholder="请输入密码" />
						</uni-forms-item>
						<button type="primary" @click="submitForm">登陆</button>
				</uni-forms>
			</view>
		</view>
	</view>
</template>

<script>
import { login } from '../../utils/api'
import { setStore, toast } from '../../utils/index'
export default {
	data() {
		return {
			formData: {
				mobile: '13128542661',
				password: '123123'
			}
		}
	},
	methods: {
		submitForm(){
			this.$refs.form.submit().then(res=>{
				if(!this.formData.mobile || !this.formData.password){
					toast('请输入账号/密码', true)
					return
				}
				this.login()
			})
		},
		login(){
			login(this.formData).then(res=>{
				toast('登陆成功')
				setStore('token', res.data.access_token)
				setStore('cart', res.data.member.cart_num)
				uni.switchTab({
					url: '/pages/index/index',
				})
			})
		}
	}
}
</script>

<style lang="less">
.login-top{
  height: 400rpx;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40rpx 0 0 40rpx;
  background: #1989fa;
  color: #fff;
  &::after{
    content: '';
    display: block;
    width: 280rpx;
    height: 280rpx;
    position: absolute;
    right: 40rpx;
    bottom: 50rpx;
    background-image: url('https://img.imgdb.cn/item/608a5d48d1a9ae528fefc4eb.png');
    background-size: 100% 100%;
  }
  text{
    font-size: 48rpx;
  }
}
.login-bottom{
  background: #fff;
  width: 90vw;
  margin: 0 auto;
  margin-top: -60rpx;
  position: relative;
  border-radius: 20rpx;
  z-index: 2;
  .inner{
    padding: 40rpx;
  }
}
</style>
