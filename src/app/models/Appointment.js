module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        date: DataTypes.DATE
    })

    Appointment.associate = models => {
        Appointment.belongsTo(models.User, { foreignKey: 'userId' })
        Appointment.belongsTo(models.User, { foreignKey: 'providerId' })
    }

    return Appointment
}
