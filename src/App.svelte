<script>
	import Nav from './components/Nav.svelte';
	import { Router, Route } from 'svelte-routing';
	import Home from './pages/Home.svelte';
	export let url = '';
</script>

<Router url="{url}">
	<Nav />
	<div class="app-wrapper">
		<Route path="/" component="{Home}" />
	</div>
</Router>

<style lang="scss">
	:global {
		@import "bulma/sass/utilities/_all.sass";
		@import "bulma/sass/base/_all.sass";
		html {
			overflow-y: auto !important;
		}
		.columns {
			margin-left: 0px !important;
			margin-right: 0px !important;
		}
	}
	.app-wrapper {
		padding-top: 25px;
		display: flex;
		flex-direction: column;
	}
</style>
