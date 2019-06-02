module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        return req.session.user.provider
            ? res.redirect('app/appointments')
            : res.redirect('/app/dashboard')
    }

    return next()
}
