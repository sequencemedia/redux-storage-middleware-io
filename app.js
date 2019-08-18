require('module-alias/register')
require('@babel/register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const Handlebars = require('handlebars')

const fetch = require('isomorphic-fetch')

const chalk = require('chalk')

const {
  renderToString
} = require('@sequencemedia/react-redux-render')

const modulePath = process.cwd()
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const assetsPath = path.resolve(publicPath, 'assets')

const config = require('redux-storage-middleware-io/server/config')()

const {
  good
} = require('redux-storage-middleware-io/server/config/good')

const {
  configureStore
} = require('redux-storage-middleware-io/client/app/store')

const { default: IndexPage } = require('redux-storage-middleware-io/client/app/components/index-page')

const error = (e) => {
  console.error(e)

  return (Boom.isBoom(e))
    ? e
    : Boom.boomify(e, { statusCode: 500, message: 'Server error in React Router Pagination' })
}

nconf
  .argv().env()
  .defaults(config)

async function start ({ host = 'localhost', port = 5000 }) {
  const server = Hapi.server({ host, port })

  const handler = ({ params: { page = 0 }, url: { pathname = '/' } }, h) => (
    fetch(`${server.info.uri}/api/timestamp`)
      .then((response) => response.json())
      .then(({ timestamp }) => {
        const state = { timestamp: { timestamp: new Date(timestamp) } }

        return {
          app: renderToString(configureStore(state), IndexPage),
          state
        }
      })
      .then((context) => h.view('index', context))
      .catch(error)
  )

  await server.register([good, inert, vision])

  server.views({
    relativeTo: modulePath,
    path: path.join(serverPath, 'views'),
    engines: {
      html: {
        module: Handlebars,
        helpersPath: path.join(serverPath, 'views/helpers'),
        compileMode: 'sync',
        compileOptions: {
          isCached: true
        }
      }
    }
  })

  server.route([
    {
      method: 'GET',
      path: '/favicon.ico',
      handler: (request, h) => h.redirect('/assets/favicon.ico')
    },
    {
      method: 'GET',
      path: '/assets/{path*}',
      handler: {
        directory: {
          path: path.normalize(assetsPath),
          listing: false,
          index: false
        }
      }
    }, {
      method: '*',
      path: '/',
      handler
    }, {
      method: '*',
      path: '/api/timestamp',
      handler: () => ({ timestamp: new Date() })
    }
  ])

  await server.start()

  console.log(`
    ${chalk.gray('redux-storage-middleware')} ${chalk.gray('[')}${chalk.white(server.info.protocol)}${chalk.gray('://')}${chalk.white(server.info.host)}${chalk.gray(':')}${chalk.white(server.info.port)}${chalk.gray(']')}
    ${chalk.white(new Date(server.info.started))}
  `)
}

start(nconf.get('server'))
