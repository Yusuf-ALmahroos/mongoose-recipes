
const User = require('../models/user.js');

async function getUserById(req, res)
{
  try {
    const user = await User.findById(req.params.id)

    const data = {
      first:   user.first,
      last:    user.last,
      picture: user.picture,
      recipes: user.recipes
    }
    res.send(data);
  } catch (error) {
    console.error('An error has occurred finding a user!', error.message)
    res.send("error in getting user")
  }
}

module.exports = {
  getUserById,
}