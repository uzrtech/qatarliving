const mongoose = require('mongoose');
const Page = require('../models/page-model');
const User = require('../models/user_model');
const PageCategory = require('../models/page-category-model');

exports.GetPages = (req, res) => {
    Page.find({},(err,pages)=>{
      PageCategory.find({},(errr,cate)=>{
        res.status(200).json({message: "Page", pages:news,categories:cate});
      })
    })
}

exports.GetPage = (req, res) => {
  News.findById(req.body._id,(err,page)=>{
      res.status(200).json({message: "Page", data:page});
  })
}
exports.AddPage = (req, res) => {
  const url = req.protocol+'://'+req.get("host");
  var page = new Page();
  page.user= req.body._id;
  page.title= req.body.title;
  page.des= req.body.des;
  page.city= req.body.city;
  page.date= new Date();
  page.category= req.body.category;
  if (req.file) {
    page.image= url+"/uploads/"+ req.file.filename;
  }  else{ page.image=req.protocol+'://'+req.get("host")+"/uploads/default.jpg"};
  page.save().then(_page=>{
    User.findByIdAndUpdate(req.body._id,{$push:{page:_page._id}},(err, _user)=>{
      console.log(_user);
    })
    res.status(200).json({message: "News", data:_page});
  }).catch(err=>{ console.log(err); })
};
 
exports.UpdatePage = (req, res) => {
  if (req.file) {
    const url = req.protocol+'://'+req.get("host");
    req.body.image= url+"/uploads/"+ req.file.filename;
  }
  News.findByIdAndUpdate(req.body._id,req.body,(err,news)=>{
    res.status(200).json({message: "Page", news:news});
})
};

exports.DeletePage = (req, res) => {
  News.findByIdAndDelete(req.body._id,(err,news)=>{
    res.status(200).json({message: "Page", news:news});
})
};

exports.AddPageCategory = (req, res) => {
  var pageCategory = new PageCategory();
  pageCategory.category= req.body.category;
  pageCategory.save().then(cate=>{
    res.status(200).json({message: "Page Category",cate:cate});
  })
};

exports.GetPageCategory = (req, res) => {
  PageCategory.find({},(err,categories)=>{
    res.status(200).json({message:'Page Categories', data:categories});
  })
};

exports.DeletePageCateogry = (req, res) => {
  pageCategory.findByIdAndDelete(req.body._id,(err,news)=>{
    res.status(200).json({message: "News", news:news});
})
};


exports.AddPost = (req ,res ,next)=>{
  var reqbody = req.body;
  var post = new Post({
    title: reqbody.title,
    des:reqbody.des,
    category: reqbody.category,
    subcategory: reqbody.subcategory,
    type: reqbody.type,
    price: reqbody.price,
    date: new Date()
  })
  const url = req.protocol+'://'+req.get("host");
  if (req.file) {
    post.image= url+"/uploads/"+ req.file.filename;
  }
  else{ post.image=req.protocol+'://'+req.get("host")+"/uploads/default.jpg"}
  post.save().then((_post)=>{
    // addNotification("","New Post Added:"+ _post.title);
    User.findByIdAndUpdate(req.body.userid,{$push:{Posts:_post._id}},(err,ress)=>{
      if(err)console.log(err);
      if(reqbody.showroom){
        console.log('showroom');
        Showroom.findByIdAndUpdate(reqbody.showroom,{$push:{posts:_post._id}},(err,_showroom)=>{
        })
      }
      if(reqbody.page){
        console.log('page');
        console.log(_post);
        
        Page.findByIdAndUpdate(reqbody.page,{$push:{posts:_post._id}},(err,_page)=>{
        })
      }
    });
    res.status(200).json({message:"post Done"});
  }).catch(err=>{console.log(err);
  })
}