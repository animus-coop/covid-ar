export const API_URL = 'https://apibueno.herokuapp.com';
export const FIXED_COLORS = {
	"Provincia de Buenos Aires": "#A3A890",
	"Catamarca": "#C70680",
	"Chaco": "#685EBF",
	"Chubut": "#9A7E44",
	"Córdoba": "#DD39E8",
	"Corrientes": "#59B730",
	"Entre Ríos": "#EB033D",
	"Formosa": "#DFB54A",
	"Jujuy": "#4CFB50",
	"La Pampa": "#37A5F8",
	"La Rioja": "#265F34",
	"Mendoza": "#6D0F16",
	"Misiones": "#613ADA",
	"Neuquén": "#924720",
	"Río Negro": "#EDCFB8",
	"Salta": "#B9A2AD",
	"San Juan": "#B36161",
	"San Luis": "#E53A65",
	"Santa Cruz": "#4C1FD5",
	"Santa Fe": "#8602D5",
	"Santiago del Estero": "#A05464",
	"Tierra del Fuego, Antártida e Islas del Atlántico Sur": "#D82F5C",
	"Tucumán": "#630DD5",
	"Ciudad Autónoma de Buenos Aires": "#A4B837"
}
export function RANDOM_COLORS() {
	return Object.keys(FIXED_COLORS).reduce((obj, provincia) => {
		obj[provincia] = getRandomColor();
		return obj;
	}, {})
}

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

