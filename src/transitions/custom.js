import { quadOut } from 'svelte/easing';

export function scaleY(node, { duration, delay }) {
	return {
		duration,
		delay,
		css: t => {
			const eased = quadOut(t);
			return `transform: scale(1,${eased});`;
		}
	};
}
