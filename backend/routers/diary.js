const express = require("express")
const router = express()
const Diary = require("../models/diarymodel")

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
      res.status(400).json({ stato: "Error: " + err})
    })
})

// endopoint chiamato dal frontend nella sezione delle attività per generare le varie info sul diario
router.get("/getdiary/:diaryId", (req, res) => {
  const { diaryId } = req.params

  Diary.findOne({ _id: diaryId }, (err, data) => {
    if (data) res.status(200).json({ diary: data })
    else res.status(400).json({ stato: "Error: " + err })
  })

})

router.get("/diaries",async (req,res)=>{
    const userId=req.session.userId
    Diary.find({
        userId: userId
    }, {
        userId: 0,
        __v: 0
    }, (err, data) => {
        if (data) res.status(200).json({diaries: data})
        else res.status(400).json({stato: err})
    })
})

module.exports = router