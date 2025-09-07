import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: name => {
      const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
      return pages[`./Pages/${name}.tsx`]?.default
    },
    setup: ({ App, props }) => React.createElement(App, props),
  }),
)