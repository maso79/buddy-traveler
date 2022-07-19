const express = require("express");
const router = express()
const emailValidator = require("email-validator")
const { formatData } = require("../functions/snippets")
const User = require("../models/usermodel")
const multer = require("multer");
const passwordValidator = require("password-validator")
//const upload = multer({ dest: './uploads' })
require("dotenv").config();

//Nome Cognome Username
router.post("/userinfo", async (req, res) => {
  const { name, surname, username } = req.body
  const userEmail = req.session.email

  var formattedName = ""
  var formattedSurname = ""

  if (typeof name == "string" && typeof surname == "string" && name.length >= 3 && surname.length >= 3) {
    formattedName = await formatData(name)
    formattedSurname = await formatData(surname)

    if (username.length >= 3) {
      //nome cognome e username sono impostati correttamente
      User.findOneAndUpdate({ email: userEmail }, { name: formattedName, surname: formattedSurname, username }, (err, data) => {
        if (!data) {
          res.status(400).json({ stato: "Ouch! Something went wrong, maybe the username selected is alredy taken!" })
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
router.post("/password", (req, res) => {
  //email da inviare all'utente per verificare che sia veramente tu a cambiare l'email
  const { password } = req.body

  const schema = new passwordValidator()

    schema
      .is().min(8) //Lunghezza minima di 8 caratteri
      .has().uppercase(1) //Deve contenere al minimo un carattere maiuscolo
      .has().digits(1) //Deve contenere al minimo una cifra
      .has().not().spaces() //Non deve contenere spazi
  
  if (schema.validate(password)) {
    //mandare email
    User.findOneAndUpdate({ email: userEmail }, { password }, (err, data) => {
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
})

//Gusti { [],[],[] } 
router.post("/preferences", (req, res) => {

})

//storage foto profilo
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

//Foto profilo
router.post("/profileimage", upload.single("profileImage"), async (req, res) => {

})

module.exports = router
