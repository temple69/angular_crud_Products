const userModel = require("../models/users.model");
const hasher = require("bcrypt");
const jwt = require("jsonwebtoken");
//This function creates User
const CreateUser = async(req, res, next) => {
    const user = req.body;
    const hashResult = await hasher.hash(user.password, 10);
    const newUser = new userModel({
        email: user.email,
        password: hashResult,
        userName: user.userName,
    });

    try {
        const createdUser = await newUser.save();
        res.status(201).json({
            message: "User Created Suceesfully",
            user: createdUser,
            Success: true,

        });
    } catch (error) {
        const message = error.message;
        res.status(500).json({
            message,
            user: [],
            Success: false,
        });
    }
};
//This function checks if user Exists and sends back response which is used to login the user
const loginUser = async(req, res, next) => {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
        const passwordMatch = await hasher.compare(
            req.body.password,
            userExist.password
        );

        if (passwordMatch) {
            const token = jwt.sign({
                    email: userExist.email,
                    userId: userExist._id,
                },
                "A_very_long_string_for_our_secret", { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                message: "Login Sucessful",
                user: userExist,
                Success: true,
                expiresIn: 3600,
            });
        } else {
            return res.status(401).json({ message: "Invalid Password" });
        }
    } else {
        return res.status(401).json({
            message: ` OOPS! ${req.body.email} not found Please Create Account Before Login`,
            user: [],
        });
    }
};
module.exports = { CreateUser, loginUser };