import mongoose from "mongoose";
import Category from "../models/category";

export function createCategory(req, res) {
  const category = new Category({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  return category
    .save()
    .then((newCategory) => {
      res.status(200).json({
        success: true,
        message: "New category is created",
        Category: newCategory,
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

export function getAllCategory(req, res) {
  Category.find()
    .select("_id name icon color userId")
    .then((allCategory) => {
      res.status(200).json({
        success: true,
        message: "A list of category",
        Category: allCategory,
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

export function getSingleCategory(req, res) {
  const id = req.params.categoryId;
  Category.findById(id)
    .then((singleCategory) => {
      res.status(200).json({
        success: true,
        message: `Detail of ${singleCategory.name}`,
        Category: singleCategory,
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

export function updateCategory(req, res) {
  const id = req.params.categoryId;
  const updateObj = req.body;
  Category.updateOne({ _id: id }, { $set: updateObj })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Category is updated",
        updateCategory: updateObj,
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

export function deleteCategory(req, res) {
  const id = req.params.categoryId;
  Category.findByIdAndRemove(id)
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
