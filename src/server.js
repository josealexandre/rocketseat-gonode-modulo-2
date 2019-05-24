const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const routes = require('./routes')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis').createClient()
const flash = require('connect-flash')

class App {
    constructor () {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.middlewares()
        this.views()
        this.routes()
    }

    middlewares () {
        this.express.use(flash())
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(
            session({
                name: 'root',
                store: new RedisStore({
                    host: '172.17.0.2',
                    port: 6379,
                    client: redis
                }),
                secret: 'MyAppSecret',
                resave: false,
                saveUninitialized: true
            })
        )

        redis.on('error', function (err) {
            console.log('Redis error: ' + err)
        })
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
