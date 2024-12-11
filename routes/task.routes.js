import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskCompletely,
    updateTaskPartially,
    removeTask
} from "../controllers/task.controller.js";
import { isLoggedIn } from "../middelwares/authMiddelware.js";


const router = Router();

router.route("/")
    .get(getAllTasks)
    .post(isLoggedIn, createTask);

router.route("/:id")
    .get(isLoggedIn, getTaskById)
    .put(isLoggedIn, updateTaskCompletely)
    .patch(isLoggedIn, updateTaskPartially)
    .delete(isLoggedIn, removeTask);

router.route("/:id/update")
    .put(isLoggedIn, updateTask);

export default router;
