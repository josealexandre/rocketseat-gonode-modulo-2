const { User, Appointment } = require('../models')
const sequelize = require('sequelize')
const { Op } = sequelize
const moment = require('moment')

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

    async show (req, res) {
        const appointments = await Appointment.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    where: { userId: sequelize.col('User.id') }
                }
            ],
            where: {
                providerId: req.session.user.id,
                date: {
                    [Op.between]: [
                        moment()
                            .startOf('day')
                            .format(),
                        moment()
                            .endOf('day')
                            .format()
                    ]
                }
            }
        })


        return res.render('appointments/index', { appointments })
    }
}

module.exports = new AppointmentController()
