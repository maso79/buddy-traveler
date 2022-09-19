const express = require("express")
const router = express()
const Diary = require("../models/diarymodel")
const {generateRetriveDiaryURL}=require("./s3")

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
  console.log(req.session)
  Diary.findOne({ _id: diaryId }, (err, data) => {
    if (data) res.status(200).json({ diary: data })
    else res.status(400).json({ stato: "Error: " + err })
  })

})

router.post("/test", (req, res) => {
  res.json({ ses: req.session.userId })
})

router.get("/diaries",async (req,res)=>{
    const userId=req.session.userId
    Diary.find({
        userId: userId
    }, {
        userId: 0,
        __v: 0
    }, async (err, data) => {

        for (i=0;i<data.length;i++){
          const url=await generateRetriveDiaryURL(data[i]._id)
          data[i].imageName=url
        }

        console.log(data)

        if (data) res.status(200).json({diaries: data})
        else res.status(400).json({stato: err})
    })
})

router.post("/updatediary/:diaryId", (req,res)=>{
  const userId=req.session.userId
  const {diaryId}=req.params
  const {name, destination, startDate, endDate}=req.body

  Diary.findOneAndUpdate({
    _id: diaryId,
    userId
  },
  {
    name,
    destination,
    startDate,
    endDate
  },(err,data)=>{
    if (data) res.json({stato: true})
    else res.json({stato: false})
  })
})

module.exports = router