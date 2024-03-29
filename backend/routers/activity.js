const express = require('express')
const router = express()
const Activity = require('../models/activitymodel')

router.post("/createone", (req, res) => {
  const { name, description, place, date, time, diaryId } = req.body

  const result = new Activity({
    name, 
    description,
    place,
    pics: [],
    date,
    time,
    diaryId
  })

  result.save()
    .then(() => {
      res.status(200),json({ stato: "success" })
    })
    .catch(err => {
      res.status(400).json({ stato: "Error" + err })
    })

})

router.get("/getactivities/:diaryId", (req, res) => {
  const { diaryId } = req.params

  Activity.find({ diaryId }).sort('startDate').exec((err, data) => {
    res.json({ data: data })
  })

})

router.get("/getone/:activityId",(req,res)=>{
  const {activityId}=req.params

  Activity.findById(activityId,
    (err,data)=>{
      if (data) res.json({data: data})
      else res.json({stato: "error"})
    })
})

module.exports = router
