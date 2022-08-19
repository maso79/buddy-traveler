const express = require("express")
const router = express()
const User = require("../models/usermodel")

router.get("/diariesnumber", (req, res) => {
  const email = req.session.email

  User.findOne({ email }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })
    } else {
      res.status(200).json({ stato: "success", data: data.diariesNumber })
    }
  })
})

router.get("/followersnumber", (req, res) => {
  const email = req.session.email

  User.findOne({ email }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })
    } else {
      res.status(200).json({ stato: "successo", data: data.numberOfFollowers })
    }
  })
})

router.get("/followingnumber", (req, res) => {
  const email = req.session.email

  User.findOne({ email }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })
    } else {
      res.status(200).json({ stato: "success", data: data.numberOfFollowing })
    }
  })
})

//Aggiungi 1 ai miei following e aggiungo 1 ai suoi follower
router.post("/addfollower", (req, res) => {
  const { usernameUser } = req.body
  const email = req.session.email

  User.findOneAndUpdate({ email }, { $inc: { numberOfFollowing: 1 }, $push: { followingUserList: usernameUser } }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })      
    } else {
      var currentUserUsername = data.username
      User.findOneAndUpdate({ username: usernameUser }, { $inc: { numberOfFollowers: 1 }, $push: { followersUserList: currentUserUsername }}, (err, data) => {
        if (!data) {
          res.status(400).json({ stato: "error" })
        } else {
          res.status(200).json({ stato: "success" })
        }
      })
    }
  })
})

//Rimouovo 1 ai miei following e rimuovo 1 ai suoi follower
router.post("/removefollow", (req, res) => {
  const { usernameUser } = req.body
  const email = req.session.email

  User.findOneAndUpdate({ email }, { $inc: { numberOfFollowing: -1 }, $pull: { followingUserList: { $in: [usernameUser] } } }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })
    } else {
      var currentUserUsername = data.username
      User.findOneAndUpdate({ username: usernameUser }, { $inc: { numberOfFollowers: -1 }, $pull: { followersUserList: { $in: [currentUserUsername] } } }, (err, data) => {
        if (!data) {
          res.status(400).json({ stato: "error" })
        } else {
          res.status(200).json({ stato: "success" })
        }
      })
    }
  })
})

//Aggiungo 1 ai miei diari
router.post("/addiary", (req, res) => {
  const email = req.session.email

  User.findOneAndUpdate({ email }, { $inc: { diariesNumber: 1 } }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "error" })
    } else {
      res.status(200).json({ stato: "success" })
    }
  })
})

//Rimuovo 1 ai miei diari
router.post("/removediary", (req, res) => {
  const email = req.session.email

  User.findOneAndUpdate({ email }, { $inc: { diariesNumber: -1 } }, (err, data) => {
    if (!data) {
      res.status(400).json({ stato: "errore" })
    } else {
      res.status(200).json({ stato: "success" })
    }
  })

}) 

module.exports = router