const express = require('express');
const router  = express.Router()

const authController = require('../controllers/authController');

router.post('/sign-up', authController.registerUser);
router.post('/sign-in', authController.signInUser);
router.get('/sign-out', authController.signOutUser);

router.get('/new', (req, res) => {
  res.render('./recipes/new.ejs')
})
router.put('/:id', authController.updatePassword);

router.get('/sign-up', (req, res) => 
{
  res.render('./auth/sign-up.ejs')
})

router.get('/sign-in', (req, res) => 
{
  res.render('./auth/sign-in.ejs')
})

router.get('/:id/update-password', (req, res) => 
{
  res.render('./auth/update-password.ejs')
})

module.exports = router;