const express = require("express");
const router = express();
const User = require('../models/usermodel')

//Accesso
router.post("/signin", (req, res) => {});

//Registrazione
router.post("/signup", (req, res) => {});

module.exports = router;
