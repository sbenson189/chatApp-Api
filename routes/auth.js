const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config')
const fileUpload = require('express-fileupload')

// const { ensureLoggedIn } = require('../middleware/auth')
const error = require('../dbErrors')

const cors = require('cors')
router.use(cors())

router.use(fileUpload())

router.get('/user/:username', async (req, res, next) => {
  try {
    const { username } = req.params
    if (!username) {
      throw new ExpressError('Username required', 404)
    }
    const results = await db.query(
      `SELECT users.username FROM users WHERE users.username = $1`, [username]
      ) 
    const user = results.rows[0]
    return res.json(user || error.userNotFound())
  } catch (e) {
    return next(e)
  }
})

router.get('/users', async (req, res, next) => {
  try {
    const results = await db.query(
      'SELECT users.username FROM users')
    const users = results.rows
    return res.send(users)
  } catch (e) {
    return next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    return res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
})

// -- Post Routes --

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, email, phone_number } = req.body
    if (!username || !password) {
      throw new ExpressError('Username and password required', 404)
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    
    const results = await db.query(`INSERT INTO users (
        username,
        password,
        first_name,
        last_name,
        email,
        phone_number
      ) 
      VALUES (
        $1, $2, $3, $4, $5, $6
      )`,
      [username, hashedPassword, first_name, last_name, email, phone_number]
    )

    return res.json(results.rows[0])
  } catch (e) {
    if (e.code === '23505') {
      return next(new ExpressError('Username and/or email taken.', 404))
    }
    return next(e)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      throw new ExpressError('Username and password required', 404)
    }
    const results = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username])
    const user = results.rows[0]
    if (user) {
      if (await bcrypt.compare(password, user.password) === true) {
        const token = jwt.sign({ username }, SECRET_KEY)
        return res.json({ message: `${username} Logged in!`, token })
      }
    }
    throw new ExpressError(`Invalid username/password ${username}, ${password}`, 404)
  } catch (e) {
    return next(e)
  }
})

router.get('/posts', async (req, res, next) => {
  try {
    const posts = await db.query(`SELECT posts.id, posts.content, posts.post_date, users.username FROM posts INNER JOIN users ON posts.user_id = users.id`)
    // const posts = await db.query(`SELECT * FROM posts`)
    const results = posts.rows
    return res.json(results)
  } catch (e) {
    return next(e)
  }
})

router.get('/posts/:username', async (req, res, next) => {
  try {
    const { username } = req.params

    const posts = await db.query(
      `SELECT users.username, posts.content, posts.post_date FROM posts JOIN users ON users.id = posts.user_id WHERE users.username = $1`, [username])
    const results = posts.rows
    console.log(results)
    return res.json(results)
  } catch (e) {
    return next(e)
  }
})

router.post('/posts', async (req, res, next) => {
  const currentDate = new Date()
  const currentDateTime = `${currentDate.getMonth()+1}/${currentDate.getDay()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
  try {
    const postDate = currentDateTime
    const { content, user } = req.body
    const getUserId = await db.query(`SELECT id from users WHERE users.username = $1`, [user])
    const userId = getUserId.rows[0].id
    // if (!ensureLoggedIn) {
    //   throw new ExpressError('Must be logged in.', 404)
    // }
    // save to db
    const results = await db.query(`INSERT INTO posts (
        user_id, 
        content,
        post_date
      ) 
      VALUES (
        $1, $2, $3
      )`,
      [userId, content, postDate])
    return res.json(results.rows[0])
  } catch (e) {
    return next(e)
  }
})

router.delete('/posts/:id', async (req, res, next) => {
  try {
    const results = db.query('DELETE FROM posts WHERE id = $1', [req.params.id])
    return res.send({ msg: "Post removed." })
  } catch (e) {
    return next(e)
  }
})

module.exports = router