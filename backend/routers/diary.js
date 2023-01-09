const express = require("express")
const router = express()
const Diary = require("../models/diarymodel")
const Follower = require("../models/followersmodel")
const User = require("../models/usermodel")
const DiaryBanList = require("../models/diarylistmodel")
const { generateRetriveDiaryURL } = require("./s3")

router.post("/createone", (req, res) => {
  const { name, destination, startDate, endDate } = req.body

  console.log(req.session.userId)

  const result = new Diary({
    name,
    destination,
    imageName: "",
    startDate,
    endDate,
    userId: req.session.userId
  })

  result.save()
    .then(() => {
      res.status(200).json({ stato: "success" })
    }).catch(err => {
      res.status(400).json({ stato: "Error: " + err })
    })
})

// endopoint chiamato dal frontend nella sezione delle attività per generare le varie info sul diario
router.get("/getdiary/:diaryId", (req, res) => {
  const { diaryId } = req.params
  console.log(req.session)
  Diary.findOne({ _id: diaryId }, (err, data) => {
    if (data) res.status(200).json({ diary: data })
    else res.status(400).json({ stato: "Error: " + err })
  })

})

router.post("/test", (req, res) => {
  res.json({ ses: req.session.userId })
})

router.get("/diaries", async (req, res) => {
  const userId = req.session.userId

  Diary.find({
    userId: userId
  }, {
    userId: 0,
    __v: 0
  }, async (err, data) => {

    for (i = 0; i < data.length; i++) {
      const url = await generateRetriveDiaryURL(data[i]._id)
      data[i].imageName = url
    }

    console.log(data)

    if (data) res.status(200).json({ diaries: data })
    else res.status(400).json({ stato: err })
  })
})

router.post("/updatediary/:diaryId", (req, res) => {
  const userId = req.session.userId
  const { diaryId } = req.params
  const { name, destination, startDate, endDate } = req.body

  Diary.findOneAndUpdate({
    _id: diaryId,
    userId
  },
    {
      name,
      destination,
      startDate,
      endDate
    }, (err, data) => {
      if (data) res.json({ stato: true })
      else res.json({ stato: false })
    })
})

//Diary visibility

//mostra lista followers
router.get("/showuserslist", async (req, res) => {
  const userId = req.session.userId
  var arrayUsers = []

  var x = Follower.find({ isFollowed: userId })

  x = await x.clone()

  for (const element of x) {
    var z = User.findOne({ _id: element.isFollowing })

    z = await z.clone()

    arrayUsers.push({ username: z.username, userId: z._id })
  }

  res.json({ data: arrayUsers })
})

//cambia accesso al diario
router.post("/changevisibility", (req, res) => {
  const followerId = req.body._id
  const myId = req.session.userId
  const banUser = req.body.change

  if (banUser) { //bisogna nascondere a questo utente il diario
    const result = new DiaryBanList({ userDiaryId: myId, userNotAllowedId: followerId })

    result.save()
      .then(() => {
        res.status(200).json({ stato: "success" })
      }).catch(err => {
        res.status(400).json({ stato: "Error: " + err })
      })

  } else { //bisogna mostrare a questo utente il diario
    DiaryBanList.findOneAndRemove({ userDiaryId: myId, userNotAllowedId: followerId }, (err, data) => {
      if (err) {
        res.status(400).json({ err })
      } else {
        res.status(200).json({ stato: "success" })
      }
    })
  }
})

//restituisci i diari per username
router.post("/retrivediariesbyid", (req, res) => {
  const userId = req.body.userId

  Diary.find({ userId }, (err, data) => {
    if (data) {
      res.status(200).json({ data: data })
    } else {
      res.status(400).json({ stato: "error" })
    }
  })

})

module.exports = router