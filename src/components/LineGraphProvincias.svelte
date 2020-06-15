<script>
	import { fade } from 'svelte/transition';
	import * as Pancake from '@sveltejs/pancake';
	import dayjs from 'dayjs';
	/**
	 * Valores máximos y mínimos
	 **/
	let x1 = +Infinity;
	let x2 = -Infinity;
	let y1 = +Infinity;
	let y2 = -Infinity;
	
	let closest;
	/**
	 * Formateamos las provincias
	 * con el historial de confirmados
	 * Tambien filtramos las provincias con 0 casos
	 **/
	export let provincias = [];

	$: points = provincias.reduce((points, provincia) => {
		return points.concat(provincia.data.map(d => ({
			x: d.x,
			y: d.y,
			provincia
		})));
	}, []);

	$: provincias.map(provincia => {
		provincia.data.map(({x, y}) => {
			if (x < x1) x1 = x;
			if (x > x2) x2 = x;
			if (y < y1) y1 = y;
			if (y > y2) y2 = y;
		})
	});

	$: console.log({x1, x2, y1, y2});
	$: console.log({provincias});
</script>

<div class="chart" on:mouseleave={() => {
	closest = null;
}}>
	<Pancake.Chart {x1} {x2} y1={y1} y2={y2}>
		<!-- Grilla Horizontal -->
		<Pancake.Grid horizontal count={5} let:value>
			<div class="grid-line horizontal">
				<span>{value}</span>
			</div>
		</Pancake.Grid>
		<!-- Grilla Vertical -->
		<Pancake.Grid vertical count={5} let:value>
			<span class="x-label">{dayjs(value).format('DD/MM')}</span>
		</Pancake.Grid>
		<!-- Lineas -->
		<Pancake.Svg>
			{#each provincias as provincia}
				<Pancake.SvgLine data={provincia.data} let:d>
					<path class="data" {d}></path>
				</Pancake.SvgLine>
			{/each}

			{#if closest}
				<Pancake.SvgLine data={closest.provincia.data} let:d>
					<path in:fade={{duration: 200}} out:fade={{duration: 200}} class="highlight" {d}></path>
				</Pancake.SvgLine>
			{/if}
		</Pancake.Svg>

		<!-- Descripcion del punto más cercano al puntero -->
		{#if closest}
			<Pancake.Point x={closest.x} y={closest.y}>
				<span in:fade={{duration: 200}} out:fade={{duration: 200}} class="annotation-point"></span>
				<div in:fade={{duration: 200}} out:fade={{duration: 200}} class="annotation" style="transform: translate(-{100 * ((closest.x - x1) / (x2 - x1))}%,0)">
					<strong>{closest.provincia.name}</strong>
					<span>{dayjs(closest.x).format('DD/MM')}: <strong>{closest.y}</strong> nuevos casos</span>
				</div>
			</Pancake.Point>
		{/if}

		<!-- Obtiene la linea más cerca del puntero -->
		<Pancake.Quadtree data={points} bind:closest/>
	</Pancake.Chart>
</div>


<style lang="scss">
	.chart {
		height: 400px;
		padding: 3em 0 2em 2em;
		margin: 0 0 36px 0;
		width: 100%;
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

	path.data {
		stroke: rgba(0,0,0,0.2);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1px;
		fill: none;
	}

	path.area {
		fill: rgba(0,100,100,0.2);
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
