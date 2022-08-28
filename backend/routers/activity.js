const express = require('express')
const router = express()
const Activity = require('../models/activitymodel')

router.post("/createone", (req, res) => {
  const { name, description, place, startTime, endTime, diaryId } = req.body

  const result = new Activity({
    name,
    description,
    place,
    pics: [],
    startTime,
    endTime,
    diaryId
  })

  result.save()
    .then(() => {
      res.status(200).json({ stato: "success" })
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

module.exports = router
