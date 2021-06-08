<script>
import { setCart } from './utils/index'
export default {
	onLaunch: function() {
		console.log('onLaunch');
		setCart()
	},
	onShow: function() {
		
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="less">
@import "./static/styles/common.less";
@import "./static/styles/iconfont.css";
</style>
