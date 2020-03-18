const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const Post = require('../models/post-model');
const User = require('../models/user_model');
const NewsC = require('../models/news-category-model');
const date = new Date();
const Cat = require('../models/category-model');
const Showroom = require('../models/showroom-model');
const Notification = require('../models/notification-model');

exports.AddPost = (req ,res ,next)=>{
  var reqbody = req.body;
  var post = new Post({
    title: reqbody.title,
    des:reqbody.des,
    category: reqbody.category,
    subcategory: reqbody.subcategory,
    type: reqbody.type,
    fields: JSON.parse(reqbody.fields),
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
    });
    res.status(200).json({message:"post Done"});
  }).catch(err=>{console.log(err);
  })
}
exports.Categories =  (req ,res)=>{
  Cat.find({},(err, cats)=>{
    NewsC.find({},(errr,newsC)=>{
      res.status(200).json({message:"Categories", data:cats, newsCategories:newsC });
    });
  })
};

exports.Notifications =  (req ,res)=>{
  Notification.find({}).sort({date:-1}).then(
    (noti)=>{
      if(noti && noti.length>10){
        noti= noti.splice(0,10);
      }
      res.status(200).json({message:"Categories", data:noti });
    }
  )
};

exports.CategoriesUpdate =  (req ,res)=>{
  Cat.findByIdAndUpdate(req.body._id,req.body,(err, cat)=>{
    if(err){console.log(err);}
    //addNotification("Admin","Categories Updated:"+ cat.name);
    res.status(200).json({message:"Categories", data:cat });
  })
};

exports.CategoriesAdd =  (req ,res)=>{
  var cat = new Cat({
    name:req.body.name,
    cat:[],
    fields:[]
  });
  cat.save().then(newCat=>{
    res.status(200).json({message:"Added New actegory", data:newCat });
  }).catch(err=>{
    res.status(401).json({message:err });
  })
};
exports.GetPosts =  (req ,res)=>{
  Post.find({},(err, posts)=>{
    res.status(200).json({message:"Posts", posts:posts });
  })
};
exports.GetPost =  (req ,res)=>{
  Post.findById(req.body._id,(err, post)=>{
    res.status(200).json({message:"Post", post:post });
  })
};

exports.DeletePost =  (req ,res)=>{
  Post.findByIdAndDelete(req.body._id,(err, post)=>{
    res.status(200).json({message:"Post Delete", post:post });
  })
};

exports.GetUser =  (req ,res)=>{
  User.findById(req.body._id).populate('Posts').populate('showroom').exec(function (err, _data) {
    res.status(200).json({message:"User", data:_data });
  });
};

exports.UpdateUser =  (req ,res)=>{
  values= JSON.parse(req.body.values);
  if (req.file) {
    const url = req.protocol+'://'+req.get("host");
    values.profile_pic= url+"/uploads/"+ req.file.filename;
  }
  User.findByIdAndUpdate(values._id,values,(err, _data)=>{
    res.status(200).json({message:"User", data:_data });
  })
};
exports.UpdateUserPass =  (req ,res)=>{
  User.findById(req.body._id,(err,data)=>{
    if(data.password==req.body.old){
     User.findByIdAndUpdate(req.body._id,{password:req.body.new},(err,_user)=>{
      res.status(200).json({message:"Password", data:_user });
     })
    }
  })
};

exports.GetPostsBy =  (req ,res)=>{

  if(req.body.sub && req.body.sub!=''){
    Post.find({category:req.body.name, subcategory:req.body.sub},(err, posts)=>{
      res.status(200).json({message:"Posts", posts:posts });
    })
  }
  else{
    Post.find({category:req.body.name},(err, posts)=>{
      res.status(200).json({message:"Posts", posts:posts });
    })
  }
};
addNotification = (_name,_text)=>{
  var notification = new Notification({
    name: _name,
    date: new Date(),
    text: _text
  });
  notification.save((err,ress)=>{
    if(ress){
    }
  })
}


exports.CreateShowroom =(req ,res)=>{
  var values = req.body;
  var showroom = new Showroom({
    user: values._id,
    title: values.title,
    city: values.city,
    address: values.address
  });
  if (req.file) {
    const url = req.protocol+'://'+req.get("host");
    showroom.image= url+"/uploads/"+ req.file.filename;
  }
  showroom.save().then(_showroom=>{
    User.findByIdAndUpdate(req.body._id,{$push:{showroom:_showroom._id}},(err,user)=>{})
    res.status(200).json({message:"Posts", data:_showroom });
  })
}


exports.CreateShowroomPost =(req ,res)=>{
  Showroom.findOneAndUpdate(req.body.showroom_id,{$push:{posts:req.body.post_id}},(err,_post)=>{
  })
}
exports.UpdateShowroom =(req ,res)=>{
  var values = req.body;
  var showroom = {
    title: values.title,
    city: values.city,
    address: values.address};
  
  if (req.file) {
    const url = req.protocol+'://'+req.get("host");
    showroom.image= url+"/uploads/"+ req.file.filename;
  }
  Showroom.findByIdAndUpdate(req.body.showroom_id, showroom ,{new: true}, (err, ress)=>{
    res.status(200).json({message:"Updated", data:ress });
  })
}

exports.GetShowroom = (req ,res)=>{
 Showroom.findById(req.body._id,(err,data)=>{
  res.status(200).json({message:"Posts", data:data });
 })
}