<template>
<view class="goods-sku">
    <view class="close" bindtap="onClose" @click="onClose">
      <uni-icons type="closeempty" size="20" />
    </view>
    <view class="top">
      <image class="img" :src="pic" />
      <view class="info">
        <view class="price">￥{{price}}</view>
        <view class="stock">剩余{{stock}}件</view>
        <view class="tips" v-if="selectText">
          已选 
          <text class="type">{{selectText}}</text>
        </view>
        <view class="tips" v-else>
          请选择 
          <text
						class="type"
						v-for="item in attrs"
						:key="item.id"
						v-show="!item.active"
					>
						{{item.title}}
					</text>
        </view>
      </view>
    </view>
    <view class="option" v-for="(item, index) in attrs" :key="item.id">
      <view class="title">{{item.title}}</view>
      <view class="list">
        <text
					:class="{item: true, act:child.active, disabled: child.disabled}"
					v-for="(child, cIndex) in item.value"
					:key="child.base_spec_value_id"
					@click="onSelectOption(index,cIndex,child)"
				>
					{{child.title}}
				</text>
      </view>
    </view>
    <view class="count">
      <view>购买数量</view>
      <view>
        <uni-number-box :min="1" v-model="num" />
      </view>
    </view>
    <view class="bar">
      <view class="btn join" @click="onSubmit('cart')">加入购物车</view>
      <view class="btn buy" @click="onSubmit('buy')">立即购买</view>
    </view>
  </view>
</template>

<script>
import { toast } from '../../utils/index'
export default {
	name:"Sku",
	props: {
		sku: {
			type: Object,
			default(){
				return {}
			}
		}
	},
	data() {
		return {
			pic: '',
			price: '',
			stock: '',
			attrs: [],
			num: 1,
			selectText: ''
		};
	},
	created(){
		this.calcSku(this.sku)
	},
	watch: {
		sku(){
			this.calcSku(this.sku)
		}
	},
	methods: {
		onClose(){
			this.$emit('onClose')
		},
		onSubmit(type){
			if(!this.sku_id){
				toast('请选择商品规格', true)
				return
			}
			this.$emit('onSubmit',{type, sku_id: this.sku_id, num: this.num})
		},
		
		calcSku(sku){
			if(Object.keys(sku).length<1) return
			this.pic = sku.picture
			this.price = sku.price
			this.stock = sku.stock
			this.attrs = sku.base_attribute_format
			
			if(this.attrs.length){
				this.skuList = sku.sku
				this.selected = new Array(this.attrs.length)
				// 保存每个分类选中的数据id
				this.selected.fill('')
				// skuArr为二维数组,储存每种组合里管理的规格id
				this.skuArr = this.skuList.map(item=>item.data.split('-'))
			}else{
				this.sku_id = sku.sku[0].id
			}
		},
		onSelectOption(pIndex, cIndex, child){
			if(child.disabled||child.active) return
			// 把选中的数据id放入对应的位置
			this.selected[pIndex] = child.base_spec_value_id
			const attrs = JSON.parse(JSON.stringify(this.attrs))
			attrs[pIndex].value.map(item=>item.active = false)
			attrs[pIndex].value[cIndex].active = true
			attrs[pIndex].active = true
			// 上面设置选择状态
			// 下面设置哪些需要禁用的
			this.setOptionStatus(pIndex,attrs)
			this.setSelectText()
		},
		setOptionStatus(pIndex,attrs){
			attrs.forEach((item,index)=>{
				if(index != pIndex){	// 跳过相同的分类
					let inList = this.skuArr
						/*
							根据选中的值，找出相应的组合 如找出inList数组里，找出位置0、3和selected对应位置相同的组合
							如有3个分类 内存[1,2],重量[1,2],颜色[1,2,3]
							[1,1,1],[1,1,2],[1,1,3]
							[2,1,1],[2,1,2],[2,2,1],[2,2,2],[2,2,3]
							而 [1,2,1],[1,2,2],[1,2,3],[2,1,3] 是缺货
							
							若第一次选择内存1，selected为[1,'','']
							index为0跳过，继续index为1
							attrs[index],也就是判断重量，经过循环selected，inList为 [[1,1,1],[1,1,2],[1,1,3]]
							循环inList，把每个子数组里的index位存为ids [1,1,1]
							循环attrs[index]里的子项[1,2], 发现ids不存在2, 这时候可以认为2是不可选，设为disabled
							继续下一次循环index为2
							attrs[index],也就是判断颜色，经过循环selected，inList为 [[1,1,1],[1,1,2],[1,1,3]]
							循环inList，把每个子数组里的index位存为ids [1,2,3]
							循环attrs[index]里的子项[1,2,3], 发现ids都存, 不作任何操作
							
							
							若第一次选择内存2，selected为[2,'','']
							index为0跳过，继续index为1
							attrs[index],也就是判断重量，经过循环selected，inList为 [[2,1,1],[2,1,2],[2,2,1],[2,2,2],[2,2,3]]
							循环inList，把每个子数组里的index位存为ids [1,1,2,2,2]
							循环attrs[index]里的子项[1,2], 发现ids都存, 不作任何操作
							继续下一次循环index为2，attrs[index]里的子项[1,2,3]，ids为[1,2,1,2,3], 发现ids都存, 不作任何操作
							>>>
							继续第二次选择重量为1，selected为[2,1,'']
							index为0,
							attrs[index],也就是判断内存，经过循环selected，inList为 [[1,1,1],[1,1,2],[1,1,3],[2,1,1],[2,1,2]]
							循环inList，把每个子数组里的index位存为ids [1,1,1,2,2]
							循环attrs[index]里的子项[1,2], 发现ids都存, 不作任何操作
							下一次循环index为1跳过，继续index为2
							attrs[index],也就是判断颜色，经过循环selected，inList为 [[2,1,1],[2,1,2]]
							循环inList，把每个子数组里的index位存为ids [1,2]
							循环attrs[index]里的子项[1,2,3], 发现ids不存在3, 设为disabled
							
							
							
						*/
					this.selected.forEach((s,i)=>{
						if(s && i != index) inList = inList.filter(l=>l[i] == s)
					})
					
					const ids = inList.map(item=>item[index])
					item.value.forEach(child=>{
						const cid = child.base_spec_value_id
						child.disabled = !ids.includes(cid) 
					})
				}
			})
			
			this.attrs = attrs
		},
		setSelectText(){
			const ok = this.selected.filter(item=>!item).length
			if(ok == 0){
				const str = this.selected.join('-')
				const cur = this.skuList.find(item=>item.data == str)
				this.sku_id = cur.id
				this.selectText = cur.name
				this.stock = cur.stock
				this.price = cur.price
			}
		}
	}
}
</script>

<style lang="less">
.goods-sku{
  position: relative;
  padding: 32rpx;
  .close{
    position: absolute;
    right: 32rpx;
    top: 32rpx;
    color: gray;
    font-size: 44rpx;
  }
  .top{
    display: flex;
    .img{
      width: 180rpx;
      height: 180rpx;
    }
    .info{
      flex: 1;
      padding: 24rpx 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .stock{
        font-size: 24rpx;
        color: gray;
      }
      .tips{
        color: gray;
        font-size: 24rpx;
      }
      .type{
        color: gray;
        font-size: 24rpx;
        padding: 0 8rpx;
      }
      .price{
        color: red;
      }
    }
  }
  .option{
    padding-bottom: 20rpx;
    .title{
      padding: 20rpx 0;
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      .item{
        font-size: 24rpx;
        border-radius: 4rpx;
        padding: 12rpx 20rpx;
        margin: 6rpx 10rpx;
      }
      .act{
        background-color: #fde7ea;
        color: #FB0017;
      }
      .disabled{
        color: #c8c9cc;
      }
    }
  }
  .count{
    padding: 20rpx 0;
    display: flex;
    justify-content: space-between;
  }
  .bar{
    padding-top: 20rpx;
    display: flex;
    justify-content: center;
    .btn{
      display: flex;
      width: 340rpx;
      height: 80rpx;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .join{
      border-radius: 40rpx 0 0 40rpx;
      background: linear-gradient(to right,#ffd01e,#ff8917);
    }
    .buy{
      border-radius: 0 40rpx 40rpx 0;
      background: linear-gradient(to right,#ff6034,#ee0a24);
    }
  }
}
</style>
