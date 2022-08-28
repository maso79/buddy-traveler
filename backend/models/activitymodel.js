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
      type: Array,
      required: false
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
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