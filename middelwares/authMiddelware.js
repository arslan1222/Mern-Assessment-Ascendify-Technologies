import jwt from "jsonwebtoken";
import AppError from "../utils/customError.js";
import asyncHandler from "./asynchandler.js";
import User from "../models/user.model.js";


const isLoggedIn = asyncHandler(async (req, _res, next) => {
    const { token } = req.cookies;
    console.log("Token received:", token);

    if (!token) {
        return next(new AppError("Unauthorized, please login to continue", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return next(new AppError("User not found, please login again", 400));
        }

        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return next(new AppError("Unauthorized, please login to continue", 400));
    }
});


const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export { isLoggedIn, authenticate};
