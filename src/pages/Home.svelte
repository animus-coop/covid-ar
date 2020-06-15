<script>
	import { onMount } from 'svelte';
	import StackedProvincias from './../components/StackedProvincias.svelte';
	import { get } from '../services/ApiBueno';
	import LineGraphProvincias from './../components/LineGraphProvincias.svelte';
	import data from '../data/demo.json';
	let provConfirmDiarios = [];
	const getConfirmados = async () => {
		let confirmados = await get('confirmados');
		return confirmados;
	};
	onMount(async () => {
		provConfirmDiarios = await getConfirmados();
	});
</script>

<div class="columns">
	<div class="column is-12">
		<div class="container">
			<article class="panel is-info">
				<p class="panel-heading">
					Casos diarios
				</p>
				<div class="panel-block">
					<StackedProvincias provincias={provConfirmDiarios.lugares}></StackedProvincias>
				</div>
			</article>
		</div>
	</div>
</div>

<style lang="scss">
	@import "bulma/sass/utilities/_all.sass";
	@import "bulma/sass/grid/_all.sass";
	@import "bulma/sass/components/panel.sass";
	@import "bulma/sass/elements/container.sass";
</style>
