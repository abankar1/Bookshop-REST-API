const express=require('express');
const router=express.Router();
// const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');

const checkAuth=require('../middleware/check-auth')

//const User=require('../models/userModel');
const UserController=require('../controller/userController');

router.post('/signup', UserController.users_signup_user);

router.post('/login', UserController.users_login_user);

router.delete('/:userId',checkAuth, UserController.users_delete_user);

module.exports=router;
