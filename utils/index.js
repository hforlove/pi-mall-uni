export function toast(title, flag = false) {
  uni.showToast({
    title,
    image: flag ? '../../static/images/warning.png' : ''
  })
}

export function setStore(key,value) {
  uni.setStorageSync(key, value)
}

export function getStore(key) { 
  return uni.getStorageSync(key)
}

export function removeStore(key){
  uni.removeStorageSync(key)
}

export function setCart(){
	const cart = getStore('cart')
	if(cart && cart !=0 ){
		uni.setTabBarBadge({index: 2, text: cart })
	}else{
		uni.removeTabBarBadge({index: 2})
	}
}

export function navigateTo(url) {
	uni.navigateTo({url})
}

export function switchTab(url) {
  uni.switchTab({url})
}