<template>
	<view class="search-bar">
		<uni-icons type="search" />
		<input type="text" v-model="value" />
	</view>
</template>

<script>
	export default {
		name:"Search",
		props:{
			value: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less">
.search-bar{
	display: flex;
}
</style>
