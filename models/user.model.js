import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullName: {
        type: String,
        minLength: [4, "Name must be at least 4 characters"],
        maxLength: [20, "Name should be less than 20 characters"],
        required: [true, "Name is required"],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        minLength: 6,
        required: [true, "Password is required"],
        select: false
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    generateJWTToken: function () {
        return jwt.sign(
            { id: this._id, role: this.role },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY || "1d", // Default to 1 day if JWT_EXPIRY is not set
            });
    },
    comparePassword: function (plainTextPassword) {
        return bcrypt.compare(plainTextPassword, this.password);
    },
};

const User = model("User", userSchema);

export default User;
