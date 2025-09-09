import express from "express";
import Task from "../models/taskModel.js";

const route = express.Router();

route.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send({ tasks: tasks });
  } catch (error) {
    res.status(500).json({ message: "unable to fetch task data" });
  }
});

route.get("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.send({ task });
  } catch (error) {
    res.status(500).json({ message: "unable to fetch task data" });
  }
});

route.post("/task", async (req, res) => {
  const { title, description, date, pinned, completed, colour, category } =
    req.body;
  try {
    const task = new Task({
      title,
      description,
      date,
      category,
      colour,
      pinned: pinned || false,
      completed: completed || false,
      date: date ? new Date(date) : new Date(),
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "unable to create task " });
  }
});
route.put("/task/:id", async (req, res) => {
  const { id } = req.params;

  const { title, description, date, completed, colour, pinned, category } =
    req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        colour,
        pinned,
        completed,
        date: date ? new Date(date) : new Date(),
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).send({ task: task });
  } catch (error) {
    res.status(500).json({ message: `unable to update task ${id} ` });
  }
});

route.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task" });
  }
});

export default route;
