const mongoose = require('mongoose')

const userBlockedModel = new mongoose.Schema({
  userIdWhoBlocks: {
    type: String
  },
  userIdWhoIsBlocked: {
    type: String
  }
})

const BlockedUser = mongoose.model("blockedUser", userBlockedModel)
module.exports = BlockedUser