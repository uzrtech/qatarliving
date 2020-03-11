const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const Post = require('../models/post-model');
const User = require('../models/user_model');
const NewsC = require('../models/news-category-model');
const date = new Date();
const Cat = require('../models/category-model');
const Notification = require('../models/notification-model');

exports.AddPost = (req ,res ,next)=>{
  if(req.file){
    console.log("file found");
  }
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
    console.log(_post);
    // addNotification("","New Post Added:"+ _post.title);
    User.findByIdAndUpdate(req.body.userid,{$push:{Posts:_post._id}},(err,ress)=>{
      if(err)console.log(err);
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
  console.log(req.body.fields);
  
  Cat.findByIdAndUpdate(req.body._id,req.body,(err, cat)=>{
    if(err){console.log(err);}
    console.log(cat);
    
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
  console.log('posdpasf');
  Post.findById(req.body._id,(err, post)=>{
    res.status(200).json({message:"Post", post:post });
  })
};

// exports.GetUser =  (req ,res)=>{
//   console.log(req.body._id);
//   User.findById(req.body._id).populate('posts').then(user=>{
//     console.log(user);
//     res.status(200).json({message:"User", data:user });
    
//   })
// };

exports.GetUser =  (req ,res)=>{
  console.log(req.body._id);
  User.findById(req.body._id).populate('Posts').exec(function (err, _data) {
    console.log(_data);
    res.status(200).json({message:"User", data:_data });
  });
};

exports.UpdateUser =  (req ,res)=>{
  User.findByIdAndUpdate(req.body._id,req.body,(err, _data)=>{
    res.status(200).json({message:"User", data:_data });
  })
};
exports.UpdateUserPass =  (req ,res)=>{
  User.findById(req.body._id,(err,data)=>{
    console.log(data);
    
    if(data.password==req.body.old){
     User.findByIdAndUpdate(req.body._id,{password:req.body.new},(err,_user)=>{
       console.log(_user);
      res.status(200).json({message:"Password", data:_user });
     })
    }
  })
};

exports.GetPostsBy =  (req ,res)=>{

  if(req.body.sub && req.body.sub!=''){
    console.log(req.body.name+ req.body.sub);
    
    Post.find({category:req.body.name, subcategory:req.body.sub},(err, posts)=>{
      console.log(posts);
      
      res.status(200).json({message:"Posts", posts:posts });
    })
  }
  else{
    Post.find({category:req.body.name},(err, posts)=>{
      res.status(200).json({message:"Posts", posts:posts });
    })
  }
};
// exports.AppointmentApproval = (req, res)=>{
//     Post.findOneAndUpdate({_id:req.body.post_id},{approved:true})
//     .then ((subject)=>{
//       return res.status(200).json({message:'Post Approved'});
// }).catch((err)=>{console.log("Failed to Approve Post postapproval"); return; })};
 

// exports.AppointmentRejection = (req, res)=>{
//     Post.findOneAndDelete({_id:req.body.post_id})
//     .then ((subject)=>{
//       return res.status(200).json({message:'Post Deleted'});
// }).catch((err)=>{console.log("Failed to Delete Post"); return; })};
addNotification = (_name,_text)=>{
  var notification = new Notification({
    name: _name,
    date: new Date(),
    text: _text
  });
  notification.save((err,ress)=>{
    if(ress){
      console.log("Notidication added");
      console.log(ress);
      
    }
  })
}