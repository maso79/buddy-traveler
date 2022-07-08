const express = require("express");
const router = express();
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const bcrypt = require("bcryptjs")
const User = require('../models/usermodel')
require("dotenv").config();

const store = new MongoDBSession({
  uri: process.env.DB_URI,
  collection: "Sessions"
})

store.on("error", (error) => {
  console.log(error)
})

router.use(
  require("express-session")({
    secret: process.env.SECRET_TOKEN,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //Una settimana
    },
    store: store,
    resave: true,
    saveUninitialized: true
  })
)

//Registrazione
router.post("/signup", async (req, res) => {
  const { email, password, cognome, nome, username } = req.body

  console.log(req.body)

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  const result = new User({
    email,
    password: hashPassword,
    cognome,
    nome,
    username
  })

  result.save()
    .then(() => {
      //email sender
      res.status(200).json({ stato: "success" })
    })
    .catch(err => {
      if (err.code == 11000) {
        res.status(400).json({ stato: "duplicated" })
      } else {
        res.status(400).json({ stato: `error: ${err}` })
      }
    })

});

//Accesso
router.post("/signin", (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }, (err, data) => {
    if (!data) res.status(400).json({ stato: "not found" })
    bcrypt.compare(
      password,
      data.password,
      (err, resp) => {
        if (!resp) res.status(400).json({ stato: `error: ${err}` })
        req.session.isAuth = true
        res.status(200).json({ stato: "success" })
      }
    )
  })
});

//Logout
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) res.status(400).json({ stato: `error: ${err}` })
    res.status(200).json({ stato: "success" })
  })
})

module.exports = router;
