const bcrypt = require('bcrypt');

const User = require('../models/user');

async function registerUser (req, res)
{
  try {
    const userInDb = await User.findOne({email: req.body.email})
    if(userInDb)
    {
      return res.send('user already taken');
    }
    if(req.body.password !== req.body.confirmPassword)
    {
      return res.send('Password and Confirm Password must match');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    const user = await User.create({
      first: req.body.first,
      last:  req.body.last,
      email: req.body.email,
      password: hashedPassword,
      picture: req.body.picture,
      recipes: []
    })

    res.render('./auth/thanks.ejs', { user })
  } catch (error) {
    console.log("error in registering user", error.message);
  }
}

async function signInUser (req, res)
{
  try {
    const user = await User.findOne({email: req.body.email})
    if(!user)
    {
      return res.send('No user has been registered with that email. Please sign up!');
    }
    const isVaildPassword = bcrypt.compareSync(req.body.password, user.password)
    if(!isVaildPassword)
    {
      return res.send('Incorrect  Password')
    }

    req.session.user = {
      email: user.email,
      _id: user._id
    }

    res.redirect(`/users/${user._id}`)
  } catch (error) {
    console.error('An error has occurred signing in a user!', error.message)
  }
}

function signOutUser(req, res)
{
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (error) {
    console.error('An error has occurred signing out a user!', error.message)
  }
}

async function updatePassword(req, res)
{
  try {
    const user = await User.findById(req.params.id);
    if(!user)
    {
      res.send('No user with this ID')
    }

    if(req.body.newPassword !== req.body.confirmPassword) 
    {
      return res.send('Password and Confirm Password must match')
    }

    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12)
    user.password = hashedPassword;
    await user.save();
    res.render('./auth/confirm.ejs', { user })
  } catch (error) {
    console.error("An error has occurred updating a user's password!", error.message)
  }
}

module.exports = {
  registerUser,
  signInUser,
  signOutUser,
  updatePassword
}