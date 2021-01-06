import mongoose from "mongoose";
import Food from "../models/food";

export function createFood(req, res) {
  const food = new Food({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    categoryId: req.body.categoryId,
    userId: req.body.userId,
  });

  return food
    .save()
    .then((newFood) => {
      res.status(201).json({
        success: true,
        message: "New food is created",
        Food: newFood,
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

export function getAllFoods(req, res) {
  Food.find()
    .select("_id name categoryId userId")
    .then((allFood) => {
      res.status(200).json({
        success: true,
        message: "A list of food",
        Food: allFood,
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

export function getSingleFood(req, res) {
  const id = req.params.foodId;
  Food.findById(id)
    .then((singleFood) => {
      res.status(200).json({
        success: true,
        message: `Detail of ${singleFood.name}`,
        Food: singleFood,
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

export function updateFood(req, res) {
  const id = req.params.foodId;
  const updateObj = req.body;
  Food.updateOne({ _id: id }, { $set: updateObj })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Food is updated",
        updateFood: updateObj,
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

export function deleteFood(req, res) {
  const id = req.params.foodId;
  Food.findByIdAndRemove(id)
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
