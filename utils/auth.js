const requireAuth=(req,res,next)=>{
    if(!req.session.userid){
       return res.redirect('https://blogging-project-using-express.vercel.app/login');
    }
    next();
}
// checkAuth locals used to provide data to views pages //
const checkAuth=(req,res,next)=>{
    res.locals.isAuthenticated=req.session.userid?true:false;
    next();
}
module.exports={requireAuth,checkAuth};