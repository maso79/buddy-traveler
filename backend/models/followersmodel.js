const mongoose = require('mongoose')

const followersModel = new mongoose.Schema({
  isFollowing: {
    type: String
  },
  isFollowed: {
    type: String
  }
})

const Follower = mongoose.model("Follower", followersModel)
module.exports = Follower