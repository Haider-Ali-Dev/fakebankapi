const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt-nodejs")
const helmet = require("helmet");
const { coinsUpdate } = require("./controllers/updateCoins")
const app = express();
const { registerController } = require("./controllers/register");
const { signIn } = require("./controllers/signin");
const { leaderboardController } = require('./controllers/leaderboard')
const { sendMoneyController } = require('./controllers/sendMoney')

app.use(express.json())
app.use(cors())
app.use(helmet())
const db = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '',
      database : 'fakecryptodatabase'
    }
})



app.post('/register', (req, res) => registerController(db, bcrypt, req, res))
app.get('/', (req, res) => {
  db('users').select('name', 'coins').then(data => {
    res.json(data)
  })
})
app.put('/update/coins', (req, res) => coinsUpdate(db, req, res))
app.post('/signin', (req, res) => signIn(db, bcrypt, req, res))
app.get('/leaderboard', (req, res) => leaderboardController(db, req, res))
app.put('/sendmoney', (req, res) => sendMoneyController(req, res, db))

app.listen(3000, () => {
    console.log("Server started")
})