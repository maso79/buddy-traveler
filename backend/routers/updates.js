const express = require("express");
const router = express()
const emailValidator = require("email-validator")
const { formatData } = require("../functions/snippets")
const User = require("../models/usermodel")
const multer = require("multer");
//const upload = multer({ dest: './uploads' })
require("dotenv").config();

//Valori modificabili:
// Nome x
// Email x
// Cognome x
// Username x
// Password
// Foto profilo
// Gusti { [],[],[] } x

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

//Filtri controllo immagine
const uploadFilter = function (req, file, cb) {
  var typeArray = file.mimetype.split('/')
  var fileType = typeArray[1]

  if (fileType == 'jpg' || fileType == 'png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage: storage, fileFilter: uploadFilter })

router.post('/profile', upload.single("profileImage"), async (req, res) => {
  const { email, surname, name, username, preferenceParameters } = req.body

  console.log(req.file)
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

  User.findOneAndUpdate({ email: userEmail }, { email, name: formattedName, surname: formattedSurname, username, preferenceParameters }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })
    } else {
      req.session.email = email
      res.status(200).json({ stato: "success" })
    }
  })
})

module.exports = router
