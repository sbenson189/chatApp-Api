const { Client } = require('pg') // destructuring Client from pg (otherwise it would have to be pg.Client everywhere)
    
let DB_URI // creates DB_URI variable and conditionally setting it to two different db's below:

if (process.env.NODE_ENV === 'test') { // two db's, one for testing and one for application
    DB_URI = 'postgresql://test'
} else {
    DB_URI = 'postgresql:///chat_db'
}

let db = new Client({
    connectionString: DB_URI // need to give new Client instance a connection point (which we established above)
})

db.connect() // db is name of variable established above, we are connecting to it.

module.exports = db