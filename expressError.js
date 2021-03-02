class ExpressError extends Error { // name ('ExpressError') doesn't matter -- Extends the default Error class
constructor (message, status) {
    super()
    this.message = message // message and status are being stored
    this.status = status
    console.error(this.stack) // every Error instance has a stack property extended from Error class
}
}
module.exports = ExpressError