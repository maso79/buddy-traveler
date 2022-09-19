const express = require("express")
const router = express()
const User = require("../models/usermodel")
const Follower = require("../models/followersmodel")

router.post("/addfollow", async (req, res) => {
  const { followedUserUsername } = req.body
  const userId = req.session.userId

  console.log(req.session)

  let x = User.findOne({ username: followedUserUsername })

  x = await x.clone()
  const followedUserId = x.userId

  let result = new Follower({
    isFollowing: userId,
    isFollowed: followedUserId
  })
    
  result.save()
    .then(() => {
      res.status(200).json({ stato: "success" })
    })
    .catch((err) => {
      res.status(400).json({ err })
    })

})

router.post("/removefollow", (req, res) => {

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

//  router.get("/followersnumber", (req, res) => {
//   const email = req.session.email

//   User.findOne({ email }, (err, data) => {
//     if (!data) {
//       res.status(400).json({ stato: "error" })
//     } else {
//       res.status(200).json({ stato: "successo", data: data.numberOfFollowers })
//     }
//   })
// })

// router.get("/followingnumber", (req, res) => {
//   const email = req.session.email

//   User.findOne({ email }, (err, data) => {
//     if (!data) {
//       res.status(400).json({ stato: "error" })
//     } else {
//       res.status(200).json({ stato: "success", data: data.numberOfFollowing })
//     }
//   })
// })

// //Aggiungi 1 ai miei following e aggiungo 1 ai suoi follower
// router.post("/addfollower", async (req, res) => {
//   const { usernameUser } = req.body
//   const email = req.session.email

//   var userData = User.findOne({ username: usernameUser })

//   userData = await userData.clone()
//   var userImageName = userData.imageName

//   User.findOneAndUpdate({ email }, { $inc: { numberOfFollowing: 1 }, $push: { followingUserList: { username: usernameUser, imageName: userImageName } } }, (err, data) => {
//     if (!data) {
//       res.status(400).json({ stato: "error" })      
//     } else {
//       var currentUserUsername = data.username
//       var currentUserImageName = data.imageName
//       User.findOneAndUpdate({ username: usernameUser }, { $inc: { numberOfFollowers: 1 }, $push: { followersUserList: { username: currentUserUsername, imageName: currentUserImageName } }}, (err, data) => {
//         if (!data) {
//           res.status(400).json({ stato: "error" })
//         } else {
//           res.status(200).json({ stato: "success" })
//         }
//       })
//     }
//   })
// })

// //Rimuovo 1 ai miei following e rimuovo 1 ai suoi follower
// router.post("/removefollow", (req, res) => {
//   const { usernameUser } = req.body
//   const email = req.session.email

//   User.findOneAndUpdate({ email }, { $inc: { numberOfFollowing: -1 }, $pull: { followingUserList: { $in: [username] } } }, false, (err, data) => {
//     if (!data) {
//       res.status(400).json({ stato: "error" })
//     } else {
//       var currentUserUsername = data.username
//       User.findOneAndUpdate({ username: usernameUser }, { $inc: { numberOfFollowers: -1 }, $pull: { followersUserList: { $in: [currentUserUsername] } } }, false, (err, data) => {
//         if (!data) {
//           res.status(400).json({ stato: "error" })
//         } else {
//           res.status(200).json({ stato: "success" })
//         }
//       })
//     }
//   })
// })

module.exports = router