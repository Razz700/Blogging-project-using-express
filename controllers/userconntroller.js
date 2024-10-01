const base64=require('base-64');
const brcypt=require('bcrypt');
const Users=require('../models/users.js');

const signupPage=(req,res)=>{
    res.render('signup.ejs',{message:null});
}
const loginPage=(req,res)=>{
    res.render('login.ejs',{message:null});
}
const registerUser=async(req,res)=>{
    try{
      const {name,email,password}=req.body;
      //console.log(name,password,email)
      const existingUser=await Users.findOne({email});
      if(existingUser){
        return res.render('signup.ejs',{message:'Email already exists. Please login'});      
      }
      const hashPassword=await brcypt.hash(password,10);
      const newuser=new Users({
        name,email,password:hashPassword
      });
      newuser.save().then((res1)=>{
     res.render('login.ejs',{message:'User created Successfully!'}); 
      }).catch((err)=>{
        return res.render('signup.ejs',{message:'User cannot be created. Please try again later'});      
      })
    }catch(e){
        return res.render('signup.ejs',{message:'User cannot be created due to server issue. please contact support'});      
    }
}
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existingUser=await Users.findOne({email});
        if(!existingUser){
          return res.render('login.ejs',{message:'Email not registered. Please signup'});      
        }
        const passwordMatch=await brcypt.compare(password,existingUser.password);
        if(passwordMatch){
         req.session.userid=existingUser._id;
           return res.redirect('https://blogging-project-using-express.vercel.app/'); 
            // const redirectUrl = `${req.protocol}://${req.get('host')}/`;
            // console.log(`Redirecting to: ${redirectUrl}`);
            // return res.redirect(redirectUrl);
        }else{
            res.render('login.ejs',{message:'Invalid Password!'}); 
        }
    }catch(err){
        return res.render('login.ejs',{message:'User cannot be Login due to server issue. please contact support'});      
    }
}
//////////////allusers///////////////////
const allUsers=(req,res)=>{
  Users.find()
  .then(response=>{
    res.json(response);
  })
  .catch(error=>{
    res.json(error)
  })
}
///////////////////logout//////////////////////
const logout=(req,res)=>{
  req.session.destroy(()=>{
   return res.redirect('https://blogging-project-using-express.vercel.app/login');
  });
}
module.exports={signupPage,loginPage,registerUser,login,allUsers,logout}
