import {model, Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLegth: [8, "Title must be atleast 8 characters"],
        maxLegth: [100, "Title must be less than 100 characters"],
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        minLegth: [8, "Description must be atleast 8 characters"],
    },
    completed: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
},{timestamps: true});


const Task = model("Task", taskSchema);


export default Task;