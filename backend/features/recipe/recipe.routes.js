const express = require('express');
const router = express.Router();
const { createRecipe, updateRecipe, deleteRecipe, getAllRecipes, getRecipeById, searchRecipe } = require('./recipe.service');
const verifyToken = require('../../middleware/authJWT');

router.post("/", verifyToken, createRecipe);
router.put("/:id", verifyToken, updateRecipe);
router.delete("/:id", verifyToken, deleteRecipe);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.get("/search", searchRecipe);

module.exports = router;