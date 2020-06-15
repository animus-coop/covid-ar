# ⚡ covid-ar


🚀 Visualizador ultra liviano y rápido _(tan solo 20KB gzipped)_ de COVID-19 en Argentina.

Demo: [coronavirus.animus.coop](https://coronavirus.animus.coop)

Realizado únicamente con 2 dependencias: [Svelte](https://svelte.dev) y [Bulma](https://bulma.io).

Este proyecto fue hecho para la visualización de la información pública sobre el estado de COVID-19 en Argentina por provincia.


## Datos utilizados
La información de confirmados, muertes y recuperados provienen de [apibueno](https://github.com/facttic/apibueno), una API de acceso público desarrollada y mentenida por las cooperativas integrantes de [FACT[TIC]](https://facttic.org.ar/).

## Instalación

```bash
git clone https://github.com/animus-coop/covid-ar.git
cd covid-ar
npm install
```
*Se necesita [Node.js](https://nodejs.org) instalado para compilar el proyecto.*

### Iniciar
```bash
npm run dev
```

### Compilar para producción
```bash
npm run build
```
