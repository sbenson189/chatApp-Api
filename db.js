const { Client } = require('pg') // destructuring Client from pg (otherwise it would have to be pg.Client everywhere)
    
let DB_URI = `postgresql://`

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/chat_db`
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/chat_db`
}

let db = new Client({
    // connectionString: DB_URI, 
    connectionString: process.env.DATABASE_URL !== undefined ? process.env.DATABASE_URL : DB_URI,
    // ssl: true
    ssl: { rejectUnauthorized: false }
})

// Would typically not show key
const SECRET_KEY = process.env.SECRET_KEY || 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMTIiLCJpYXQiOjE2MTQ2MzgxMjV9.MnSnkdDHPSs52uMEj3g1psRrc-xY8ReRp2PhsmGltWQ'

const BCRYPT_WORK_FACTOR = 12;

db.connect() // db is name of variable established above, we are connecting to it.

module.exports = {
  db,
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};