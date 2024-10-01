const express=require('express');
const session=require('express-session');
const app=express();
//const base64=require('base-64');
//const brcypt=require('bcrypt');
const mongoose=require('mongoose');
//const Users=require('./models/users.js');
const { router } = require('./router.js');
const { checkAuth } = require('./utils/auth.js');
require('dotenv').config();
const path = require('path');



mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1r3c2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then((res)=>{
console.log('connected to mongodb');
}).catch(e=>{
console.log(e);
});
/////////////////
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true
}));
////for deploy on vercel only this path.join code requires///////////
app.set('views', path.join(__dirname, 'views')); // Ensure this line is added
app.set('view engine','ejs');

app.use(checkAuth);
app.use(router);

// app.listen(3000,()=>{
//     console.log('Listening to port 3000');
// });
module.exports=app;