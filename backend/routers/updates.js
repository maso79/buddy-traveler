const express = require("express");
const router = express()
const emailValidator = require("email-validator")
const { formatData } = require("../functions/snippets")
const User = require("../models/usermodel")
require("dotenv").config();

//Valori modificabili:
// Nome
// Cognome
// Username
// Password
// Foto profilo
// Gusti { [],[],[] }

router.post('/profile', async (req, res) => {
  const { email, surname, name, username, placesArray, countriesArray, groupsArray } = req.body

  //I valori di imageName e image se non sono presenti devono essere inviati di default come null

  const userEmail = req.session.email
  var formattedName = ""
  var formattedSurname = ""

  if (emailValidator.validate(email)) {

    if (typeof name == "string" && typeof surname == "string" && name.length >= 3 && surname.length >= 3) {
      formattedName = await formatData(name)
      formattedSurname = await formatData(surname)

    } else {
      res.status(400).json({ stato: "name or surname not valid" })
    }
  } else {
    res.status(400).json({ stato: "email not valid" })
  }

  User.findOneAndUpdate({ email: userEmail }, { email, name: formattedName, surname: formattedSurname, username, preferenceParameters: { placesArray, countriesArray, groupsArray } }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })
    } else {
      req.session.email = email
      res.status(200).json({ stato: "success" })
    }
  })
})

module.exports = router
