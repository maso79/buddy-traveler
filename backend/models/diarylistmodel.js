const mongoose = require('mongoose')

const diaryListModel = new mongoose.Schema({
  userDiaryId: {
    type: String
  },
  userNotAllowedId: {
    type: String
  }
})

const DiaryBanList = mongoose.model("DiaryBan", diaryListModel)
module.exports = DiaryBanList