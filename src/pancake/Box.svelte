<script>
	import { getChartContext } from '@sveltejs/pancake/components/Chart.svelte';
	import { get_ticks } from '@sveltejs/pancake/utils/ticks.mjs';

	export let x1 = 0;
	export let x2 = 1;
	export let y1 = 0;
	export let y2 = 1;

	const { x: x_scale, y: y_scale } = getChartContext();

	let box;
	$: {
		const _x1 = $x_scale(x1);
		const _x2 = $x_scale(x2);
		const _y1 = $y_scale(y1);
		const _y2 = $y_scale(y2);

		const left   = Math.min(_x1, _x2);
		const right  = Math.max(_x1, _x2);
		const top    = Math.min(_y1, _y2);
		const bottom = Math.max(_y1, _y2);

		const width = right - left;
		const height = bottom - top;

		box = {left, right, top, bottom, height};
	};
</script>

<slot {box}></slot>
