const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const Post = require('../models/post-model');
const date = new Date();
const Cat = require('../models/category-model');

exports.AddPost = (req ,res ,next)=>{
  if(req.file){console.log("file found");
  }
  var reqbody = req.body.data;
  console.log(reqbody);
  var post = new Post({
    title: reqbody.title,
    des:reqbody.des,
    category: reqbody.category,
    subcategory: reqbody.subcategory,
    type: reqbody.type,
    city: reqbody.city,
    image: reqbody.city,
    price: reqbody.price,
  })
      // post.save().then((_appointment)=>{
      //   console.log(_appointment);
      //   res.status(200).json({message:"post Done"});
      // })
}
exports.Categories =  (req ,res)=>{
  Cat.find({},(err, cats)=>{
    res.status(200).json({message:"Categories", categories:cats });
  })
};
exports.GetPosts =  (req ,res)=>{
  Post.find({},(err, posts)=>{
    res.status(200).json({message:"Posts", posts:posts });
  })
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
