const mongoose = require("mongoose")

const activityModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    pics: {
      //array strutturato tipo ["","",""]
      arrayPics: Array,
      required: false
    },
    date: {
      type: Date,
      required: true
    },
    time:{
      type: String,
      required: true
    },
    diaryId: {
      type: String,
      required: true
    },
  }
  // ,
  // { timestamps: true }
);

const Activity = mongoose.model("Activity", activityModel);
module.exports = Activity;