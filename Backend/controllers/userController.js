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

        res.cookie('token', token);


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

        const IsPasswordMatch = await bcrypt.compare(password, isUser.password)
        if (!isUser || !IsPasswordMatch) {
            return res.json({
                success: false,
                message: "User not Found"
            })
        }

        const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie('token', token)

        res.json({
            success: true,
            message: "Login Successfully!",
            username: isUser.name,
            welcome: `Welcomebacke, ${isUser.name}`
        })

    } catch (error) {
        res.json({
            success: false,
            message: `Error in login user: ${error.message}`
        })
    }
}

export { registerUser, loginUser }