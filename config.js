// const DB_URI = (process.env.NODE_ENV === "test")
//   ? "postgresql:///express_auth_test"
//   : "postgresql:///express_auth";
let DB_URI = `postgresql://`

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/`
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/`
}

const SECRET_KEY = process.env.SECRET_KEY || 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMTIiLCJpYXQiOjE2MTQ2MzgxMjV9.MnSnkdDHPSs52uMEj3g1psRrc-xY8ReRp2PhsmGltWQ'

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};
