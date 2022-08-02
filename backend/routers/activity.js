const express = require('express')
const router = express()
const Activity = require('../models/activitymodel')

router.post("/createone", (req, res) => {
  const { name, place, pics, startDate, endDate } = req.body

})

module.exports = router
