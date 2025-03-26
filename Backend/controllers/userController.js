import { USER } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new USER({ name, email, password: hashPassword });
        const existEmail = await USER.findOne({ email });

        if (!newUser) {
            return res.json({
                success: false,
                message: "User Not Vaild"
            })
        }

        if (existEmail) {
            return res.json({
                success: false,
                message: `Email is Already Exsit.`
            })
        }
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        });



        res.json({
            success: true,
            message: "User Register successfully!",
        })

    } catch (error) {
        res.json({
            success: false,
            message: `Error in Register User : ${error.message}`
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await USER.findOne({ email });

        // First, check if the user exists before comparing the password
        if (!isUser) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // Now, check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, isUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Set the cookie *before* sending JSON response
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "None", // Required for cross-origin cookies
        });

        // Send response after setting the cookie
        return res.status(200).json({
            success: true,
            message: "Login Successfully!",
            username: isUser.name,
            welcome: `Welcome back, ${isUser.name}`,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in login user: ${error.message}`,
        });
    }
};

export { registerUser, loginUser }