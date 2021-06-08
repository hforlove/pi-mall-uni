<template>
	<view class="address-edit">
		<uni-forms :value="address" ref="form">
			<uni-forms-item label="姓名" name="realname">
					<uni-easyinput type="text" v-model="address.realname" placeholder="收货人姓名" />
			</uni-forms-item>
			<uni-forms-item label="电话" name="mobile">
					<uni-easyinput type="text" v-model="address.mobile" placeholder="收货人电话" />
			</uni-forms-item>
			<uni-forms-item label="地区" name="area">
					<uni-easyinput @focus="onOpenPicker" type="text" :disabled="disabled" v-model="address.address_name" placeholder="选择省/市/区" />
			</uni-forms-item>
			<uni-forms-item label="详细地址" name="password">
					<uni-easyinput type="text" v-model="address.address_details" placeholder="街道门牌 楼层房间号等信息" />
			</uni-forms-item>
			<view class="address-default">
				<text>设为默认收货地址</text>
				<switch :checked="address.is_default!=0" @change="onChange"/>
			</view>	
			<view class="address-save">
				<button type="warn" @click="onSubmit">保存</button>
				<view class="space"></view>
				<button class="del" v-show="address.id" type="primary" plain @click="onDelete">删除</button>
			</view>
		</uni-forms>
		<lotus-address @choseVal="onChoseArea" :lotusAddressData="area_data" />
			
	</view>
</template>

<script>
import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue"
import { toast } from '../../utils/index'
import { createAddress, updateAddress, deleteAddress, getAddressDetail } from '../../utils/api'
export default {
	components: { LotusAddress: lotusAddress },
	data() {
		return {
			disabled: false,
			address: {
				address_name: '',
				realname: '',
				mobile: '',
				address_details: '',
				province_id: '',
				city_id: '',
				area_id: '',
				is_default: 0
			},
			area_data: {
				visible: false,
				provinceName: '',
				cityName: '',
				townName: '',
			}
		}
	},
	onLoad({id}){
		if(id) this.getAddress(id)
		// this.openPicker()
	},
	methods: {
		onChange(ev){
			this.address.is_default = ev.detail.value * 1
		},
		onOpenPicker() {
			this.disabled = true
			this.area_data.visible = true
		},
		onChoseArea(res){
			const { city, cityCode, province, provinceCode, town, townCode } = res
			this.area_data.visible = false
			this.disabled = false
			if(city && province && town){
				this.address.province_id = provinceCode
				this.address.city_id = cityCode
				this.address.area_id = townCode
				this.address.address_name = `${province} ${city} ${town}`
				this.area_data.provinceName = province
				this.area_data.cityName = city
				this.area_data.townName = town
			}
		},
		onSubmit(){
			const { realname, mobile, address_details, address_name } = this.address
			if( realname && mobile && address_details && address_name ){
				this.saveAddress(this.address)
			}else{
				toast('请输入完整资料','error')
			}
		},
		onDelete(){
			deleteAddress(this.address.id).then(res=>{
				uni.navigateBack()
			})
		},
		saveAddress(params){
			if(this.address.id){
				params.id = this.address.id*1
				updateAddress(params).then(res=>{
					uni.navigateBack()
				})
			}else{
				createAddress(params).then(res=>{
					uni.navigateBack()
				})
			}
		},
		getAddress(id){
			getAddressDetail(id).then(res=>{
				const arr = res.data.address_name.split(' ')
				this.address = res.data
				this.area_data.provinceName = arr[0]
				this.area_data.cityName = arr[1]
				this.area_data.townName = arr[2]
			})
		}
	}
}
</script>

<style>
.address-edit{
	padding: 32rpx 40rpx;
}
.address-default{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.address-save{
	padding-top: 60rpx;
}
</style>
