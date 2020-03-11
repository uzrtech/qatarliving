const mongoose = require('mongoose');
const News = require('../models/news-model');
const NewsC = require('../models/news-category-model');




exports.GetNews = (req, res) => {
    News.find({},(err,news)=>{
      NewsC.find({},(errr,cate)=>{
        res.status(200).json({message: "News", news:news,categories:cate});
      })
    })
}

exports.GetNewsbyID = (req, res) => {
  News.findById(req.body._id,(err,news)=>{
      res.status(200).json({message: "News", news:news});
  })
}

exports.AddNews = (req, res) => {
  const url = req.protocol+'://'+req.get("host");
  var news = new News();
  news.title= req.body.title;
  news.des= req.body.des;
  news.date= new Date();
  news.category= req.body.category;
  if (req.file) {
    news.image= url+"/uploads/"+ req.file.filename;
  }  else{ news.image=req.protocol+'://'+req.get("host")+"/uploads/default.jpg"};
  news.save().then(_news=>{
    console.log('Mews Aded'+ _news);
    res.status(200).json({message: "News", news:_news});
  }).catch(err=>{
    console.log(err);
    
  })
};
 
exports.UpdateNews = (req, res) => {
  News.findByIdAndUpdate(req.body._id,req.body,(err,news)=>{
    res.status(200).json({message: "News", news:news});
})
};

exports.DeleteNews = (req, res) => {
  News.findByIdAndDelete(req.body._id,(err,news)=>{
    res.status(200).json({message: "News", news:news});
})
};

exports.AddCate = (req, res) => {
  var newsc = new NewsC();
  newsc.category= req.body.category;
  newsc.save().then(cate=>{
    res.status(200).json({message: "News",cate:cate});
  })
};


exports.DeleteCate = (req, res) => {
  NewsC.findByIdAndDelete(req.body._id,(err,news)=>{
    res.status(200).json({message: "News", news:news});
})
};