import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'

async function resolvePage(name) {
  if (typeof import.meta.glob === 'function') {
    // Vite dev environment
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]?.default
  } else {
    // Production Node environment
    const pagesPath = path.resolve('./resources/js/Pages')
    const file = fs
      .readdirSync(pagesPath)
      .find(f => f === `${name}.tsx` || f === `${name}.jsx`)

    if (!file) throw new Error(`Page not found: ${name}`)
    const module = await import(path.join(pagesPath, file))
    return module.default
  }
}

// async function resolvePage(name) {
//     // Production Node environment
//     const pagesPath = path.resolve('./resources/js/Pages')
//     const file = fs
//       .readdirSync(pagesPath)
//       .find(f => f === `${name}.tsx` || f === `${name}.jsx`)

//     if (!file) throw new Error(`Page not found: ${name}`)
//     const module = await import(path.join(pagesPath, file))
//     return module.default
// }

createServer(async page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    // resolve: name => {
    //   const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    //   return pages[`./Pages/${name}.tsx`]?.default
    // },
    resolve: resolvePage,
    setup: ({ App, props }) => React.createElement(App, props),
  }),
)