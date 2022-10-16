const mongoose = require("mongoose")

const recentUserModel = new mongoose.Schema({
  myId: {
    type: String
  },
  userId: {
    type: String
  }
})

const RecentUser = mongoose.model("RecentUser", recentUserModel)
module.exports = RecentUser