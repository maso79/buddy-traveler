const mongoose = require("mongoose")

const diarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    destination: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      required: false
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    private:{
      type: Boolean,
      required: true
    }
  }
  ,
  { timestamps: true }
);

const Diary = mongoose.model("Diary", diarySchema);
module.exports = Diary;