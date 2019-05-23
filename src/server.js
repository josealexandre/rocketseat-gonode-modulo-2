const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const routes = require('./routes')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)

class App {
    constructor () {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.middlewares()
        this.views()
        this.routes()
    }

    middlewares () {
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(
            session({
                store: new LokiStore({
                    path: path.resolve('tmp', 'sessions.db')
                }),
                secret: 'MyAppSecret',
                resave: false,
                saveUninitialized: true
            })
        )
    }

    views () {
        nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
            autoescape: true,
            express: this.express,
            watch: this.isDev
        })

        this.express.use(express.static(path.resolve(__dirname, 'public')))
        this.express.set('view engine', 'njk')
    }

    routes () {
        this.express.use(routes)
    }
}

module.exports = new App().express
