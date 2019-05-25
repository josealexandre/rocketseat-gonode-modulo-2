const { User } = require('../models')

class UserController {
    create (req, res) {
        return res.render('auth/signup')
    }

    async store (req, res) {
        if (!req.file) {
            req.flash('error', 'Insira uma foto')
            return res.redirect('/signup')
        }

        const { filename } = req.file

        await User.create({ ...req.body, avatar: filename })

        return res.redirect('/')
    }
}

module.exports = new UserController()
