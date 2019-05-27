# Module 2

GoBarber app developed from 2nd Node.js module classes.

## Frameworks and packages

Here are some frameworks and packages used in this project:

API

-   Express

View

-   Nunjucks (template engine)
-   Flatpickr (lightweight date picker)

Database

-   Sequelize
-   MariaDB

Session

-   Session (express-session)
-   Loki (previous session store)
-   Redis (current session store)

Other

-   Multer (upload files)
-   bcryptjs (encrypt passwords)
-   Moment (javascript date library)

Development

-   Nodemon
-   ESLint

If you run this project you'll need a Redis server. Follow these instructions to run a redis container:

`docker container run --name session-cache -p 6379:6379 -d redis`

If you're on Windows, you may need to get the container IP address with this command:

`docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" session-cache`

and then update the `host` property in the `server.js` file as following:

```
store: new RedisStore({
    host: '172.17.0.2',
    port: 6379,
    client: redis
}),
```
