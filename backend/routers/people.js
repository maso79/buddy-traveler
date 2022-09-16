const express = require("express")
const router = express()
const User = require("../models/usermodel")

router.post("/find", async (req, res) => {
  const { letters } = req.body
  console.log(letters)

  // let x = User.find({ username: new RegExp(letters, 'i') })
  // x = await x.clone()
  // if (x) {
  //   res.status(200).json({ data: x })
  // } else {
  //   res.status(400).json({ stato: "Looks like there's nothing outta here -.-" })
  // }

  await User.aggregate([
    {
      '$match': {
        'username': {
          '$regex': letters, 
          '$options': 'i'
        }
      }
    }
  ],(err,data)=>{
    if (data) res.status(200).json({stato: data})
    else res.status(200).json({stato: []})
  })
})

router.post("/getone", (req, res) => {
  const { username } = req.body
  
  User.findOne({ username },{ _id: 0, password: 0, email: 0 },  (err, data) => {
    if (data) {
      res.status(200).json({ data: data })
    } else {
      res.status(400).json({ stato: err })
    }
  })
})

module.exports = router