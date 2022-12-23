const mongoose = require('mongoose')

const friendlyRequestModel = new mongoose.Schema({
  requestedId: {
    type: String
  },
  receivedId: {
    type: String
  },
  state: {
    type: String
  }
})

const FriendlyRequest = mongoose.model("FriendlyRequest", friendlyRequestModel)
module.exports = FriendlyRequest