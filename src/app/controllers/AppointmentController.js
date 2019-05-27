const { User, Appointment } = require('../models')

class AppointmentController {
    async create (req, res) {
        const { providerId } = req.params
        const provider = await User.findByPk(providerId)

        return res.render('appointments/create', { provider })
    }

    async store (req, res) {
        await Appointment.create({
            date: req.body.date,
            providerId: req.params.providerId,
            userId: req.session.user.id
        })

        return res.redirect('/app/dashboard')
    }
}

module.exports = new AppointmentController()
