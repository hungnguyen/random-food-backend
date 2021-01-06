import express from "express";

import * as categoryController from "../controllers/category";
import * as foodController from "../controllers/food";
import * as userController from "../controllers/user";

const router = express.Router();
router.post("/foods", foodController.createFood);
router.get("/foods", foodController.getAllFoods);
router.get("/foods/:foodId", foodController.getSingleFood);
router.put("/foods/:foodId", foodController.updateFood);
router.delete("/foods/:foodId", foodController.deleteFood);

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUser);
router.get("/users/:userId", userController.getSingleUser);
router.put("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategory);
router.get("/categories/:categoryId", categoryController.getSingleCategory);
router.put("/categories/:categoryId", categoryController.updateCategory);
router.delete("/categories/:categoryId", categoryController.deleteCategory);

export default router;
