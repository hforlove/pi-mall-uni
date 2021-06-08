import request from './request'

/** 
 * 用户模块api
*/

// 获取验证码
export function sendSmsCode(mobile){
  return request({
    method:'post',
    url: '/site/sms-code',
    data:{
      usage: "register",
      mobile
    }
  })
}

// 注册
export function register(data){
  return request({
    method:'post',
    url: '/site/register',
    data: {
      group: "tinyShopH5",
      ...data,
      password_repetition: data.password
    }
  })
}

// 登陆
export function login (data) {
  return request({
    method: 'post',
    url: '/site/login',
    data: {
      group: "tinyShopH5",
      ...data
    }
  })
}

// 登出
export function logout () {
  return request({
    method: 'post',
    url: '/site/logout',
  })
}




// 首页数据
export function getHomeData () {
  return request({
    method: 'get',
    url: '/index/index'
  })
}


// 分类
export function getCategory () {
  return request({
    method: 'get',
    url: '/product/cate/index'
  })
}

// 品牌
export function getBrand () {
  return request({
    method: 'get',
    url: '/product/brand/index'
  })
}


// 商品列表
export function getGoodsList (data) {
  return request({
    method: 'get',
    url: '/product/product/index',
    data
  })
}

// 商品详情
export function getGoodsDetail (id) {
  return request({
    method: 'get',
    url: '/product/product/view',
    data:{id}
  })
}

// 加入购物车
export function addCart (data) {
  return request({
    method: 'post',
    url: '/member/cart-item/create',
    data
  })
}

// 购物车
export function getCart () {
  return request({
    method: 'get',
    url: '/member/cart-item/index'
  })
}

// 购物车数量
export function getCartNum () {
  return request({
    method: 'get',
    url: '/member/cart-item/count',
  })
}

// 更新购物车数量
export function updateCart (data) {
  return request({
    method: 'post',
    url: '/member/cart-item/update-num',
    data
  })
}

// 删除购物车
export function deleteCart (data) {
  return request({
    method: 'post',
    url: '/member/cart-item/delete-ids',
    data
  })
}

// 结算
export function getOrderPreview (data) {
  return request({
    method: 'get',
    url: '/order/order/preview',
    data
  })
}

// 创建订单
export function createOrder (data) {
  return request({
    method: 'post',
    url: '/order/order/create',
    data
  })
}

// 支付时的订单详情
export function getOrderByPay (data) {
  return request({
    method: 'get',
    url: '/member/order/view',
    data
  })
}

// 订单详情
export function getOrderDetail (id) {
  return request({
    method: 'get',
    url: '/member/order/view',
    data: { id }
  })
}

// 删除订单
export function deleteOrder (id) {
  return request({
    method: 'delete',
    url: `/member/order/delete?id=${id}`
  })
}

// 取消订单
export function closeOrder (id) {
  return request({
    method: 'get',
    url: '/member/order/close',
    data: { id }
  })
}

// 订单列表
export function getOrder (data) {
  return request({
    method: 'get',
    url: '/member/order/index',
    data
  })
}

// 收货
export function deliveryOrder (id) {
  return request({
    method: 'get',
    url: '/member/order/take-delivery',
    data: { id }
  })
}


// 支付
export function payOrder (data) {
  return request({
    method: 'post',
    url: '/common/pay/create',
    data
  })
}


// 新增地址
export function createAddress (data) {
  return request({
    method: 'post',
    url: '/member/address/create',
    data
  })
}

// 修改地址
export function updateAddress (data) {
  return request({
    method: 'put',
    url: `/member/address/update?id=${data.id}`,
    data
  })
}

// 删除地址
export function deleteAddress (id) {
  return request({
    method: 'delete',
    url: `/member/address/delete?id=${id}`
  })
}

// 地址列表
export function getAddress () {
  return request({
    method: 'get',
    url: '/member/address/index'
  })
}

// 地址详情
export function getAddressDetail (id) {
  return request({
    method: 'get',
    url: '/member/address/view',
    data: { id }
  })
}

// 个人信息
export function getUserDetail () {
  return request({
    method: 'get',
    url: '/member/member/index'
  })
}

// 更新个人信息
export function updateUser (data) {
  return request({
    method: 'put',
    url: '/member/member/update',
    data: { id: data.id },
    data
  })
}

// 收藏
export function createCollect (data) {
  return request({
    method: 'post',
    url: '/common/collect/create',
    data
  })
}

// 取消收藏
export function deleteCollect (id) {
  return request({
    method: 'delete',
    url: `/common/collect/delete?id=${id}`
  })
}

// 收藏列表
export function getCollection (data) {
  return request({
    method: 'get',
    url: '/member/collect/index',
    data
  })
}



