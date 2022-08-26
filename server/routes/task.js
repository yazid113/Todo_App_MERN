const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/", async (req, res, next) => {
  try {
    const task = new Task(req.body);
    await task.save();
    // res.status(200).json({ task });
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
      // res.status(200).json({ tasks });
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body);
    await task.save();
    // res.status(200).json({ task });
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    // res.status(200).json({ task });
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
