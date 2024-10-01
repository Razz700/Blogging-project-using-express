const express=require('express');
const router=express.Router();
const { signupPage, loginPage, registerUser, login, allUsers, logout } = require('./controllers/userconntroller.js');
const {requireAuth} = require('./utils/auth.js');
const {home,addBlog, myBlog, createBlog, deleteBlog, editBlog, updateBlog} = require('./controllers/blogController.js');

////////////////router.get(signup)//////////////////
router.get('/signup',signupPage);
////////////////router.get(login)//////////////////
router.get('/login',loginPage);
//////////////////router.post(register)/////////////
router.post('/register',registerUser);
/////////////////router.post(login)////////////////////
router.post('/login',login);
//////////////////all users/////////////////////
router.get('/allusers',requireAuth,allUsers)
///////////////logout/////////////////
router.get('/logout',logout)
/////////////////////home//////////////
router.get('/',home)
/////////////////////home//////////////
router.get('/home',home);
router.get('/myblog',requireAuth,myBlog);
router.get('/addblog',requireAuth,addBlog);
router.get('/editblog',requireAuth,editBlog);
router.post('/createblog',requireAuth,createBlog);
router.post('/updateblog',requireAuth,updateBlog);
router.get('/deleteblog',deleteBlog);

module.exports={router}