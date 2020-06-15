<script>
	import { fade } from 'svelte/transition';
</script>
<div in:fade={{duration: 200}} out:fade={{duration: 300}} class="loader-container">
	<svg x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
		<path fill="#3298dc" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
			<animateTransform 
				attributeName="transform" 
				attributeType="XML" 
				type="rotate"
				dur="1s" 
				from="0 50 50"
				to="360 50 50" 
				repeatCount="indefinite" />
		</path>
	</svg>
</div>

<style lang="scss">
	.loader-container {
		width: 80px;
		height: 80px;
		margin: auto;
		position: absolute;
		left: calc(50% - 40px);
		top: calc(50% - 40px);
	}
</style>
