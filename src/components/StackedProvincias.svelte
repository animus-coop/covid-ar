<script>
	import Loader from "./Loader.svelte";
	import { RANDOM_COLORS } from './../constants/configuration.js';
	import { fade, fly } from 'svelte/transition';
	import { scaleY } from '../transitions/custom';
	import * as Pancake from '@sveltejs/pancake';
	import Box from './../pancake/Box.svelte';
	import dayjs from 'dayjs';
	let randomColors = RANDOM_COLORS();
	/**
	 * Valores máximos y mínimos
	 **/
	const barWidth = 0.3;
	let x1 = +Infinity;
	let x2 = -Infinity;
	let y1 = +Infinity;
	let y2 = -Infinity;
	let nombreProvincias = [];
	let stacks = [];
	let max = 100;
	let from = 0;
	
	let hovered = '';
	/**
	 * Formateamos las provincias
	 * con el historial de confirmados
	 **/
	export let provincias = [];
	let points = [];
	$: if (provincias.length > 0) {
		points = provincias.reduce((list, lugar, i) => {
			Object.keys(lugar.historico).map((fecha, iv) => {
				let date = dayjs(fecha).format('DD/MM');
				if (!list[iv]) {
					list[iv] = {[lugar.provincia]: lugar.historico[fecha], fecha: date}
				} else {
					list[iv][lugar.provincia] = lugar.historico[fecha];
				}
			});
			return list;
		}, {});
		points = Object.keys(points).map(date => {
			if (+date < x1) x1 = +date;
			if (+date > x2) x2 = +date;
			return {
				date: +date,
				...points[date]
			}
		});
		nombreProvincias = provincias.map(i => (i.provincia));
		stacks = Pancake.stacks(points, nombreProvincias, 'date');
		max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map(v => v.end)), 0);
		from = points.length > 90 ? points.length - 90 : 0; // Ultimos 90 días o desde el inicio
	};

	$: if (from > 0 && from < points.length - 1) {
		let sliced = points.slice(from, points.length - 1);
		stacks = Pancake.stacks(sliced, nombreProvincias, 'date');
		max = stacks.reduce((max, stack) => Math.max(max, ...stack.values.map(v => v.end)), 0);
		x1 = sliced[0].date;
		x2 = sliced[sliced.length - 1].date;
	};

</script>

<div class="chart" in:fade={{duration: 300}} on:click={() => {randomColors = RANDOM_COLORS()}}>
	<Pancake.Chart x1={x1 - barWidth} x2={x2 + barWidth} y1={0} y2={max}>
		<!-- Grilla Horizontal -->
		<Pancake.Grid horizontal count={10} let:value>
			<div class="grid-line horizontal">
				<span>{value}</span>
			</div>
		</Pancake.Grid>
		<!-- Grilla Vertical -->
		<Pancake.Grid vertical count={15} let:value>
			<span class="x-label">{points[value].fecha}</span>
		</Pancake.Grid>
		<!-- SVG Stacks -->
		<Pancake.Svg>
			{#each stacks as stack, i}
				<g class="stack-group">
					{#each stack.values as d,vi}
						<Box
							x1={(d.i) + barWidth}
							x2={(d.i) - barWidth}
							y1={d.start}
							y2={d.end}
							let:box
						>
							<rect class="rect" in:fade={{duration: 200, delay: vi * 10}} style="fill: {randomColors[d.key]}" x={box.left} y={box.top} width={box.right - box.left} height={box.height}></rect>
						</Box>
					{/each}
				</g>
			{/each}
		</Pancake.Svg>
		<!-- Loader -->
		{#if provincias.length === 0}
			<Loader/>
		{/if}
	</Pancake.Chart>
</div>

<style lang="scss">
	:global(.pancake-chart svg) {
		overflow: hidden !important;
	}
	.chart {
		height: 350px;
		padding: 3em 0 2em 2em;
		width: 100%;
	}
	.stack-group {
		overflow: hidden !important;
	}
	.rect {
		transform-origin: 0% 100%;
	}

	input {
		font-size: inherit;
		font-family: inherit;
		padding: 0.5em;
	}

	.grid-line {
		position: relative;
		display: block;
	}

	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -2em;
		border-bottom: 1px dashed rgba(0, 0, 0, 0.144);
	}

	.grid-line span {
		position: absolute;
		left: 0;
		bottom: 2px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
	}

	.x-label {
		position: absolute;
		width: 4em;
		left: -2em;
		bottom: -22px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	.box {
		position: absolute;
		//left: 2px;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5)
	}

	.highlight {
		stroke: #ff3e00;
		fill: none;
		stroke-width: 2;
	}

	.annotation {
		position: absolute;
		white-space: nowrap;
		bottom: 1em;
		line-height: 1.2;
		background-color: rgba(255,255,255,0.9);
		padding: 0.2em 0.4em;
		border-radius: 2px;
		transition: all .3s ease-in-out;
	}

	.annotation-point {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #ff3e00;
		border-radius: 50%;
		transform: translate(-50%,-50%);
		transition: all .3s ease-in-out;
	}

	/*.annotation strong {
		display: block;
		font-size: 20px;
	}*/

	.annotation span {
		display: block;
		font-size: 14px;
	}
</style>
