<script>
	import { links } from 'svelte-routing';
	const classProp = (classes) => () => {
		return {
			class: classes
		}
	};
</script>

<nav use:links class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item navbar-logo" href="/">
			COVID-AR
		</a>
	</div>

	<div  class="navbar-menu">
		<div class="navbar-start">
			<a href="/" class="navbar-item">
				Inicio
			</a>
		</div>
	</div>
</nav>

<style lang="scss">
	@import "bulma/sass/utilities/_all.sass";
	@import "bulma/sass/components/navbar";
	nav {
		box-shadow: 0px 1px 10px rgba(0,0,0,.2);
		.navbar-logo {
			font-weight: bolder;
			font-size: 18px
		}
	}
</style>
