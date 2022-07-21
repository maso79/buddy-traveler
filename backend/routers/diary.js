const express = require("express")
const router = express()
const Diary = require("../models/diarymodel")

router.post("/createone", (req, res) => {
  const { name, destination, startDate, endDate } = req.body
  
  console.log(req.session.userId)

  const result = new Diary({
    name,
    destination,
    startDate,
    endDate,
    userId: req.session.userId
  })

  result.save()
    .then(() => {
      res.status(200).json({ stato: "success" })
    }).catch(err => {
      res.status(400).json({ stato: "Error: " + err})
    })
})

module.exports = router