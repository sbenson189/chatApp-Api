const { Client } = require('pg') // destructuring Client from pg (otherwise it would have to be pg.Client everywhere)
    
let DB_URI = `postgresql://`

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/chat_db`
} else {
  // DB_URI = process.env.DATABASE_URL || `${DB_URI}/chat_db`
  DB_URI = `${DB_URI}/chat_db`
}

let db = new Client({
    // connectionString: DB_URI, 
    connectionString: process.env.DATABASE_URL !== undefined ? process.env.DATABASE_URL : DB_URI,
    // ssl: true
    ssl: { rejectUnauthorized: true }
})

db.connect() // db is name of variable established above, we are connecting to it.

module.exports = db