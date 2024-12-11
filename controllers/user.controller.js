import User from "../models/user.model.js";
import AppError from "../utils/customError.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.JWT_SECRET,
    sameSite: "Strict"
};

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new AppError("Email is already existed!", 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
    });

    if (!user) {
        return next(new AppError("User registration failed!", 400));
    }

    await user.save();

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        success: true,
        message: "User registered successfully!",
        user,
    });
};



const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError("Invalid email or password", 401));
        }

        const jwtToken = user.generateJWTToken();

        res.cookie("token", jwtToken, cookieOptions);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: { id: user._id, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};


const logout = (req, res)=>{
    res.cookie("token", null, {
        secure: true,
        maxAge: 0,
        httpOnly: true 
    });

    res.status(200).json({
        success: true,
        message: "User logged out!",
    });
}


export {
    register,
    login,
    logout,
}
