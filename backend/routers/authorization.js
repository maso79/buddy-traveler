const express = require("express");
const router = express();
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const bcrypt = require("bcryptjs")
const User = require('../models/usermodel')
const emailValidator = require("email-validator")
const passwordValidator = require("password-validator")
const multer = require("multer");
const { formatData } = require("../functions/snippets")
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

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: Storage
}).single('profileImage')

//Registrazione
router.post("/signup", async (req, res) => {
  const { email, password, surname, name, username, arrayPaesi, arrayGusti, arrayGruppi } = req.body

  if (emailValidator.validate(email)) { //Controlla se l'email è valida
    const schema = new passwordValidator()

    schema
      .is().min(8) //Lunghezza minima di 8 caratteri
      .has().uppercase(1) //Deve contenere al minimo un carattere maiuscolo
      .has().digits(1) //Deve contenere al minimo una cifra
      .has().not().spaces() //Non deve contenere spazi

    if (schema.validate(password)) {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      if (typeof name == "string" && typeof surname == "string") {

        const formattedName = await formatData(name)
        const formattedSurname = await formatData(surname)

        const result = new User({
          email,
          password: hashPassword,
          surname: formattedSurname,
          name: formattedName,
          username,
          imageName: null,
          image: {
            data: null,
            contentType: null
          },
          preferenceParameters: {
            placesArray: ["Pub", "Museum", "Squares", "Parks"],
            countriesArray: ["Italy", "Slovenia", "Nigeria"],
            groupsArray: ["Group of 3 people", "Group of 2 people"]
          }
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
      } else {
        res.status(400).json({ stato: "name or surname not valid" })
      }

    } else {
      res.status(400).json({ stato: "password not valid" })
    }
  } else {
    res.status(400).json({ stato: "email not valid" })
  }
});

//Accesso
router.post("/signin", (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "not found" })
    } else {
      bcrypt.compare(
        password,
        data.password,
        (err, resp) => {
          if (!resp) res.status(400).json({ stato: `error: ${err}` })
          req.session.isAuth = true
          res.status(200).json({ stato: "success" })
        }
      )
    }
  })
});

//Logout
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(400).json({ stato: `error: ${err}` })
    } else {
      res.status(200).json({ stato: "success" })
    }
  })
})

module.exports = router;
