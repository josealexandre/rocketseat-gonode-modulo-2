const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const FilesController = require('./app/controllers/FilesController')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success')
    res.locals.flashError = req.flash('error')

    next()
})

routes.get('/files/:file', FilesController.show)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.use('/app', authMiddleware)
routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController)
routes.get('/app/appointments', AppointmentController.show)
routes.get('/app/appointments/new/:providerId', AppointmentController.create)
routes.post('/app/appointments/new/:providerId', AppointmentController.store)
routes.get('/app/available/:providerId', AvailableController)

module.exports = routes
