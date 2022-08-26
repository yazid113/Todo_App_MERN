const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  task: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);
