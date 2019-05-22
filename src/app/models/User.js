const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            avatar: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            passwordHash: DataTypes.STRING,
            provider: DataTypes.BOOLEAN
        },
        {
            hooks: {
                beforeCreate: async user => {
                    if (user.password) {
                        user.passwordHash = await bcrypt.hash(user.password, 8)
                    }
                }
            }
        }
    )

    return User
}
