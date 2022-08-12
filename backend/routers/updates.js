const express = require("express");
const router = express()
const emailValidator = require("email-validator")
const { formatData } = require("../functions/snippets")
const User = require("../models/usermodel")
const bcrypt = require("bcryptjs")
const passwordValidator = require("password-validator")
const { generateUploadURL, generateRetriveURL } = require("./s3")
require("dotenv").config();

router.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL(req.session.email)
  res.status(200).json({ url })
})

router.get("/profileimage", async (req, res) => {
  const url = await generateRetriveURL(req.session.email)
  console.log(url)
  res.status(200).json({ url })
})

//Nome Cognome Username
router.post("/userinfo", async (req, res) => {
  const { name, surname, username } = req.body
  const userEmail = req.session.email
  console.log(userEmail)
  var formattedName = ""
  var formattedSurname = ""

  if (typeof name == "string" && typeof surname == "string" && name.length >= 3 && surname.length >= 3) {
    formattedName = await formatData(name)
    formattedSurname = await formatData(surname)

    if (username.length >= 3) {
      //nome cognome e username sono impostati correttamente
      User.findOneAndUpdate({ email: userEmail }, { name: formattedName, surname: formattedSurname, username }, (err, data) => {
        if (!data) {
          res.status(400).json({ stato: "Ouch! Something went wrong, maybe the username selected is already taken!" })
        } else {
          //operazione andata a buon fine
          res.status(200).json({ stato: "success" })
        }
      })
    } else {
      res.status(400).json({ stato: "Username syntax is not valid!" })
    }
  } else {
    res.status(400).json({ stato: "Name or Surname syntax is not valid!" })
  }

})

//Password
router.post("/password", async (req, res) => {
  //email da inviare all'utente per verificare che sia veramente tu a cambiare l'email
  const { password } = req.body
  const userEmail = req.session.email

  const schema = new passwordValidator()

  schema
    .is().min(8) //Lunghezza minima di 8 caratteri
    .has().uppercase(1) //Deve contenere al minimo un carattere maiuscolo
    .has().digits(1) //Deve contenere al minimo una cifra
    .has().not().spaces() //Non deve contenere spazi

  if (schema.validate(password)) {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    //mandare email
    User.findOneAndUpdate({ email: userEmail }, { password: hashPassword }, (err, data) => {
      if (!data) {
        res.status(400).json({ stato: "Ouch! Something went wrong!" })
      } else {
        //operazione andata a buon fine
        res.status(200).json({ stato: "success" })
      }
    })
  } else {
    res.status(400).json({ stato: "Password syntax is not valid!" })
  }

})

//Email
router.post("/email", (req, res) => {
  //email da inviare al nuovo indirizzo per capire se l'indirizzo email selezionato esiste ed è dell'utente che lo ha aggiunto
  const { email } = req.body
  const userEmail = req.session.email

  if (emailValidator.validate(email)) {
    User.findOneAndUpdate({ email: userEmail }, { email }, (err, data) => {
      if (!data) {
        res.status(400).json({ stato: "Ouch! Something went wrong, maybe the email selected is already taken!" })
      } else {
        //operazione andata a buon fine
        req.session.email = email
        res.status(200).json({ stato: "success" })
      }
    })
  }
})

//Gusti { [],[],[] } 
router.post("/preferences", (req, res) => {
  const { placesArray, countriesArray, groupsArray } = req.body
  const userEmail = req.session.email

  //le preferenze di base non possono essere nulle, almeno una preferenza per ogni tipologia deve esserci
  User.findOneAndUpdate({ email: userEmail }, { preferenceParameters: { placesArray, countriesArray, groupsArray } }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "Ouch! Something went wrong!" })
    } else {
      //operazione andata a buon fine
      res.status(200).json({ stato: "success" })
    }
  })
})

module.exports = router
