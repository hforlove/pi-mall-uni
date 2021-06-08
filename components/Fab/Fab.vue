<template>
	 <uni-fab
		:content="content"
		direction="vertical"
		horizontal="right"
		@trigger="trigger"
	></uni-fab>
</template>

<script>
	export default {
		name:"Fab",
		data() {
			return {
				pattern: {
					color: '',
					selectedColor: '',
					backgroundColor: '',
					buttonColor: ''
				},
				content: [
					{text: '搜索'},
					{text: '首页'},
					{text: '我的'}
				]
			}
		},
		methods: {
			trigger(ev){
				console.log(ev);
			}
		}
	}
</script>

<style lang="less">

</style>
