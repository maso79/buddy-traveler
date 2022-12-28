const express = require('express')
const router = express()
const UserToBlock = require("../models/userblockedmodel")

router.post("/blockuser", (req, res) => {
  const userId = req.session.userId
  const userIdToBlock = req.body.id

  const result = new UserToBlock({
    userIdWhoBlocks: userId,
    userIdWhoIsBlocked: userIdToBlock
  })

  result.save()
    .then(() => {
      res.status(230).json({ stato: "success" })
    })
    .catch(err => {
      res.status(400).json({ stato: "Error: " + err })
    })

})

router.post("/checkblock", (req, res) => {
  const userId = req.session.userId
  const userIdBlock = req.body.id

  UserToBlock.findOne({ userIdWhoBlocks: userIdBlock, userIdWhoIsBlocked: userId }, (err, data) => {
    if (data) { //quell utente ti ha bloccato, non puoi visualizzare la sua pagina
      res.json({ stato: "you blocked" })
    } else {
      UserToBlock.findOne({ userIdWhoBlocks: userId, userIdWhoIsBlocked: userIdBlock }, (err, data) => {
        if (data) { //hai bloccato quell utente
          res.json({ stato: "he is blocked" })
        } else {
          res.json({ stato: "not blocked" })
        }
      })
    }
  })

})

router.post("/unlockuser", (req, res) => {
  const userId = req.session.userId
  const userIdBlock = req.body.id

  UserToBlock.findOneAndRemove({ userIdWhoBlocks: userId, userIdWhoIsBlocked: userIdBlock }, (err, data) => {
    if (data) {
      res.status(200).json({ stato: "success" })
    } else {
      res.status(400).json({ stato: "Error" + err })
    }
  })
})

module.exports = router