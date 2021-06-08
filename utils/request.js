
import { host } from './config'
import { getStore, toast } from './index'

function request (config){
  return new Promise((reslove, reject) => {
    uni.request({
      url: `${host}/api/tiny-shop/v1${config.url}`,
      data: config.data,
      method: config.method|| 'get',
      header: {
        'x-api-key': getStore('token')
      },
      success: (res) => {
        if(res.data.code == 401){
          toast('请先登录',true)
					setTimeout(_=>{
						uni.redirectTo({
							url: '/pages/login/login'
						})
					},1000)
        }else if(res.data.code == 200){
          reslove(res.data)
        }else{
					toast(res.data.message,true)
          reject(res.data.message)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
      }
    });
      
  })
}

export default request