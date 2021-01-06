import mongoose from "mongoose";
import User from "../models/user";

export function createUser(req, res) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
  });

  return user
    .save()
    .then((newUser) => {
      res.status(201).json({
        success: true,
        message: "New user is created",
        User: newUser,
      });
    })
    .catch((e) => {
      res.status(500).json({
        success: false,
        message: "Sever error. Try again",
        error: e.message,
      });
    });
}

export function getAllUser(req, res) {
  User.find()
    .select("_id name email picture")
    .then((allUser) => {
      res.status(200).json({
        success: true,
        message: "A list of user",
        User: allUser,
      });
    })
    .catch((e) => {
      res.status(500).json({
        success: false,
        message: "Sever error. Try again",
        error: e.message,
      });
    });
}

export function getSingleUser(req, res) {
  const id = req.params.userId;
  User.findById(id)
    .then((singleUser) => {
      res.status(200).json({
        success: true,
        message: `Detail of ${singleUser.name}`,
        User: singleUser,
      });
    })
    .catch((e) => {
      res.status(500).json({
        success: false,
        message: "Sever error. Try again",
        error: e.message,
      });
    });
}

export function updateUser(req, res) {
  const id = req.params.userId;
  const updateObj = req.body;
  User.updateOne({ _id: id }, { $set: updateObj })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User is updated",
        updateUser: updateObj,
      });
    })
    .catch((e) => {
      res.status(500).json({
        success: false,
        message: "Sever error. Try again",
        error: e.message,
      });
    });
}

export function deleteUser(req, res) {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.status(204).json({
        success: true,
      });
    })
    .catch(() => {
      res.status(500).json({
        success: false,
      });
    });
}
