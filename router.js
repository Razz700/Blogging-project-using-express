const express=require('express');
const router=express.Router();
const { signupPage, loginPage, registerUser, login, allUsers, logout } = require('./controllers/userconntroller.js');
const {requireAuth} = require('./utils/auth.js');
const {home,addBlog, myBlog, createBlog, deleteBlog, editBlog, updateBlog} = require('./controllers/blogController.js');
const path='https://blogging-project-using-express.vercel.app/'
////////////////router.get(signup)//////////////////
router.get('https://blogging-project-using-express.vercel.app/signup',signupPage);
////////////////router.get(login)//////////////////
router.get('https://blogging-project-using-express.vercel.app/login',loginPage);
//////////////////router.post(register)/////////////
router.post('https://blogging-project-using-express.vercel.app//register',registerUser);
/////////////////router.post(login)////////////////////
router.post('https://blogging-project-using-express.vercel.app//login',login);
//////////////////all users/////////////////////
router.get('https://blogging-project-using-express.vercel.app/allusers',requireAuth,allUsers)
///////////////logout/////////////////
router.get('https://blogging-project-using-express.vercel.app/logout',logout)
/////////////////////home//////////////
router.get('https://blogging-project-using-express.vercel.app/',home)
/////////////////////home//////////////
router.get('https://blogging-project-using-express.vercel.app/home',home);
router.get('https://blogging-project-using-express.vercel.app/myblog',requireAuth,myBlog);
router.get('https://blogging-project-using-express.vercel.app/addblog',requireAuth,addBlog);
router.get('https://blogging-project-using-express.vercel.app/editblog',requireAuth,editBlog);
router.post('https://blogging-project-using-express.vercel.app/createblog',requireAuth,createBlog);
router.post('https://blogging-project-using-express.vercel.app/updateblog',requireAuth,updateBlog);
router.get('https://blogging-project-using-express.vercel.app/deleteblog',deleteBlog);

module.exports={router}