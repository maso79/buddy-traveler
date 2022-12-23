const express = require("express")
const router = express()
const User = require("../models/usermodel")
const Follower = require("../models/followersmodel")
const FriendlyRequest = require("../models/requestmodel")

router.post("/getuserstats", async (req, res) => {
  const { userUsername } = req.body

  let x = User.findOne({ username: userUsername })
  x = await x.clone()

  if (x) {
    let userEmail = x.email
    let userId = x._id
    let numFollowers = Follower.find({ isFollowed: userId }).count()
    numFollowers = await numFollowers.clone()

    let numFollowing = Follower.find({ isFollowing: userId }).count()
    numFollowing = await numFollowing.clone()

    res.status(200).json({ data: { userId, userUsername, numFollowers, numFollowing, userEmail } })
  } else {
    res.status(400).json({ stato: "not found" })
  }
})

router.post("/addfollow", async (req, res) => {
  const { userUsername } = req.body
  const thisUserId = req.session.userId

  console.log(req.session)

  let x = User.findOne({ username: userUsername })

  x = await x.clone()
  const userId = x._id
  let result = new Follower({
    isFollowing: thisUserId,
    isFollowed: userId
  })

  result.save()
    .then(() => {
      res.status(200).json({ stato: "success" })
    })
    .catch((err) => {
      res.status(400).json({ err })
    })

})

router.post("/removefollow", async (req, res) => {
  const { userUsername } = req.body
  const thisUserId = req.session.userId

  let x = User.findOne({ username: userUsername })

  x = await x.clone()
  const userId = x._id

  Follower.findOneAndRemove({ isFollowing: thisUserId, isFollowed: userId }, (err, data) => {
    if (err) {
      res.status(400).json({ err })
    } else {
      res.status(200).json({ stato: "success" })
    }
  })

})

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

router.post("/isfollowing", (req, res) => {
  const userId = req.session.userId
  const { userFollowedId } = req.body

  console.log(userId)
  console.log(userFollowedId)

  Follower.findOne({
    isFollowing: userId,
    isFollowed: userFollowedId
  }, (err, data) => {
    if (data) res.json({ stato: true })
    else res.json({ stato: false })
  })
})

router.post("/isfollowingback", (req, res) => {
  const userId = req.session.userId
  const { userFollowedId } = req.body

  console.log("userId " + userId)
  console.log("userFollowedId " + userFollowedId)

  Follower.findOne({
    isFollowing: userFollowedId,
    isFollowed: userId
  }, (err, data) => {
    if (data) res.json({ stato: true })
    else res.json({ stato: false })
  })
})

// Endpoint richieste following

router.post("/makefriendlyrequest", (req, res) => {
  const userId = req.session.userId
  const idToSend = req.body.id //id della persona a cui mandi la richiesta

  const result = new FriendlyRequest({
    requestedId: userId,
    receivedId: idToSend,
    state: "pending"
  })

  result.save()
    .then(() => {
      res.status(200).json({ stato: "success" })
    })
    .catch(err => {
      res.status(400).json({ stato: "Err" + err })
    })

})

router.post("/declinefriendlyrequest", (req, res) => {
  const userId = req.session.userId
  const idToDecline = req.body.id

  FriendlyRequest.findOneAndDelete({ requestedId: idToDecline, receivedId: userId }, (err, data) => {
    if (data) {
      res.status(200).json({ stato: "success" })
    } else {
      res.status(400).json({ stato: "Err" + err })
    }
  })

})

router.post("/acceptfriendlyrequest", (req, res) => {
  const userId = req.session.userId //mio id
  const idToAccept = req.body.id //id della persona a cui devo accettare la richiesta

  FriendlyRequest.findOneAndUpdate({ requestedId: idToAccept, receivedId: userId }, { state: "accepted" }, {}, (err, data) => {
    if (data) {
      res.status(200).json({ stato: "success" })
    } else {
      res.status(400).json({ stato: "Err" + err })
    }
  })
})


router.post("/checkrequest", (req, res) => {
  const userId = req.session.userId //mio id
  const idToCheck = req.body.id //id della persona a cui ho mandato la richiesta, quindi l'id del profilo di quella persona

  FriendlyRequest.findOne({ requestedId: userId, receivedId: idToCheck }, (err, data) => {
    if (data) {
      if (data.state == "pending") {
        res.status(200).json({ stato: "pending" })

      } else if (data.state == "accepted") {
        res.status(200).json({ stato: "accepted" })
      }
    } else {
      res.status(400).json({ stato: "not found" }) //mostrare la pagina come se la richiesta non fosse mai stata mandata
    }
  })

})

module.exports = router