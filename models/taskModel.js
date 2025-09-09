import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    category: {
      type: [String],
    },
    colour: {
      type: String,
    },
    pinned: {
      type: Boolean,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
