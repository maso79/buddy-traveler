const express = require("express")
const router = express()
const User = require("../models/usermodel")

router.post("/find", async (req, res) => {
  const { letters } = req.body

  let x = User.find({ username: new RegExp(letters, 'i') })
  x = await x.clone()
  res.json({ data: x })
})

module.exports = router