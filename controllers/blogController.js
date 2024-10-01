
const Blogs = require("../models/blogSchema");
const base64=require('base-64');

const home=async(req,res)=>{
    const perPage=5;
    const page=req.query.page || 1;
    const sort=req.query.sort || 'title'
    try{
       const blogs=await Blogs.find()
        .sort({[sort]:1})
        .skip((perPage*page)-perPage) 
        .limit(perPage);

        const count=await Blogs.countDocuments();
        const totalPages=Math.ceil(count/perPage);
        res.render('home.ejs',{message:null,blogsData:blogs,current:page,pages:totalPages,sort})
    }catch(err){
       res.render('home.ejs',{message:null,blogsData:null})
    }

}

const myBlog=async(req,res)=>{
    try{
        const {message}=req.query;
        const userId=req.session.userid;
        //console.log(userId)
        const myblogs=await Blogs.find({userId});
       // console.log(myblogs,'hellow')
        res.render('myblogs.ejs',{message:message?base64.decode(message):null,blogData:myblogs});
    }catch(err){
        return res.render('myblog.ejs',{message:'Cannot render myblog due to server issue. please contact support'});     
    }
    }

const addBlog=(req,res)=>{
        res.render('addblog.ejs',{message:null})
        }
const editBlog=async(req,res)=>{
    try{
        const {blogId}=req.query;
        const blogData=await Blogs.findOne({_id:blogId});
        res.render('editblog.ejs',{message:null,blogData})
    }catch(err){
        res.render('editblog.ejs',{message:'blogs cannot be edited'})
    }
          
            }
            /////////////////////////////////////////
const createBlog=async (req,res)=>{
    try{
     const {title,body}=req.body;
     const newblog=new Blogs({
        title,body,
        userId:req.session.userid
     });
     newblog.save()
    .then(response=>
        res.redirect('/myblog')
    )
     .catch(err=>{
        return res.render('addblog.ejs',{message:'Blogs cannot be created at this time. Please try again later'});     
     })
    }catch(err){
        return res.render('addblog.ejs',{message:'Cannot create blog due to server issue. please contact support'});     
    }
}
////////////////////////////////////
const updateBlog=(req,res)=>{
    try{
        const {blogId}=req.query;
        Blogs.findByIdAndUpdate({_id:blogId }, req.body)
            .then(response=>{
res.redirect('/myblog')
            })
            .catch(err=>{
                return res.render('editblog.ejs',{message:'Cannot updated blog. please try later.'});     
   
            })
    }catch(err){
        return res.render('editblog.ejs',{message:'Cannot updated blog due to server issue. please contact support'});     
    }
}
///////////////////////////////
const deleteBlog=async(req,res)=>{
    try{
        const {blogId}=req.query;
        Blogs.findOneAndDelete({_id:blogId})
        .then(response=>{
            res.redirect('/myblog')
        })
        .catch(err=>{
            const error=base64.encode('Blog cannot be deleted. Please try again later.');
        res.redirect(`/myblog?message=${error}`);   
        })
    }catch(err){
        const error=base64.encode('Blog cannot be deleted. Please try again later.');
        res.redirect(`/myblog?message=${error}`);   
    }
}

module.exports={home,myBlog,addBlog,createBlog,deleteBlog
    ,editBlog,
    updateBlog
};