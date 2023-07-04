import express from "express";
import User from "../models/user.js";
import mongoose from "mongoose";

const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
    try {
        const users = await User.find().exec();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}

);
// serialNumber: {type: Number, required: true},
// email: {type: String, required: true},
// firstName: {type: String, required: true},
// lastName: {type: String, required: true},
// gender: {type: String, required: true},
// birthDay: {type: String, required: true},
// city: {type: String, required: true},
// country: {type: String, required: true},
// questionnaire: {type: Array, required: true},
// afterQues: {type: Array, required: true},
// beforeQues: {type: Array, required: true},
// history: {type: Array, required: true},
userRoutes.post("/", async (req, res) => {
    try {
        const user = new User({
            serialNumber: req.body.serialNumber,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            birthDay: req.body.birthDay,
            city: req.body.city,
            country: req.body.country,
            questionnaire: req.body.questionnaire,
            afterQues: req.body.afterQues,
            beforeQues: req.body.beforeQues,
            history: req.body.history,
        });
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
}

);

userRoutes.put("/:id", async (req, res) => {
    try {
        User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((model) =>
        {
            res.status(200).json(model);
        }).catch(
            err=> {
                res.status(400).json(err);
            }
        )
        }
    catch (err) {
        res.status(400).json(err);
    }
}
);

userRoutes.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

);

userRoutes.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

export default userRoutes;