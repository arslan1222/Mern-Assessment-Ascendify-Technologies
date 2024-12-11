import Task from "../models/task.model.js";
import AppError from "../utils/customError.js";

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            success: true,
            message: "All tasks",
            tasks,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const getTaskById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return next(new AppError("Task not found", 404));

        res.status(200).json({
            success: true,
            message: "Task fetched successfully!",
            task,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const createTask = async (req, res, next) => {
    const { title, description } = req.body;

    if (!title) {
        return next(new AppError("Title is required!", 400));
    }

    try {
        const task = new Task({
            title,
            description,
        });

        await task.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully!",
            task,
        });
    } catch (error) {
        console.error("Task creation error:", error.message);
        return next(new AppError(error.message, 500));
    }
};


const updateTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!task) return next(new AppError("Task not found", 404));

        res.status(200).json({
            success: true,
            message: "Task updated successfully!",
            task,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const updateTaskCompletely = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return next(new AppError("Title and description are required!", 400));
    }

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true, overwrite: true } // Overwrite ensures complete replacement
        );
        if (!task) return next(new AppError("Task not found", 404));

        res.status(200).json({
            success: true,
            message: "Task completely updated successfully!",
            task,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const updateTaskPartially = async (req, res, next) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!task) return next(new AppError("Task not found", 404));

        res.status(200).json({
            success: true,
            message: "Task partially updated successfully!",
            task,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const removeTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return next(new AppError("Task not found", 404));

        await Task.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "Task deleted successfully!",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskCompletely,
    updateTaskPartially,
    removeTask,
};
