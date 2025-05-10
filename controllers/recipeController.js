const User = require('../models/user');
const Recipe = require('../models/recipe');

async function createRecipe(req, res)
{
  try {
    const user = await User.findById(req.body.author);
    const recipe = await Recipe.create(req.body);
    user.recipes.push(recipe._id);
    user.save();
    res.send(recipe);
  } catch (error) {
    console.error("an error in creating recipe", error.message)
    res.send('error in creating recipe');
  }
}

async function getAllRecipes (req, res)
{
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.error("error in getting all recipes",  error.message);
    res.send("error in getting all recipes");
  }
}

async function getRecipeById(req, res)
{
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.send(recipe);
  } catch (error) {
    console.error("cannot find recipe by this id", error.nessage);
    res.send("error in find recipe by id")
  }
}

async function updateRecipeById(req, res)
{
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(recipe)
  } catch (error) {
    console.error("error in find   and update: ", error.message);
    res.send("error in find and update recipe");
  }
}

async function deleteRecipeById(req, res)
{
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.send("recipe is deleted successfully");
  } catch (error) {
    console.error("error in delete by id", error.message);
    res.send("error in delete by id")
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById
}