const ExpressError = require('./expressError')

const userNotFound = () => {throw new ExpressError('User not found', 404)}

exports.userNotFound = userNotFound