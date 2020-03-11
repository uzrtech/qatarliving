const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const checkAuth = require('./routerGuard/check-auth');
const app = express();
const Cat = require('./models/category-model');
var cors = require('cors')
app.use(cors())



// Include controllers from Controllers folder
const authController = require('./controllers/auth-controller');
const homeController = require('./controllers/home-controller');
const newsController = require('./controllers/news-controller');

// Include Multer to handle file upload
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {cb(null, 'uploads')},
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(' ').join('');
    cb(null, Date.now()+'-'+name);}
});
var upload = multer({ storage: storage });









// var catss = new Cat({
//     name : "Items",
//     cat:[{
//       name:"Clothing",
//       sub:["Jewelry", "Clothing"]
//     },{
//       name:"Accessories",
//       sub:["Mobile Phones", "Tablets"]
//     }]
//   });
// catss.save();


// Body Parser to get data from Request from Front End
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Folder for Uploaded Files
app.use('/uploads', express.static(path.join('uploads')));
app.use(express.static(path.join(__dirname,'public')));

// Database Connection
const l ="mongodb://localhost:27017/qatarlivings";
const o="mongodb+srv://hamza:mongopassword@cluster0-t5iqe.mongodb.net/qatarliving?retryWrites=true&w=majority";

mongoose.connect(o, { useNewUrlParser:true, useFindAndModify: false, useCreateIndex:true}).
then(()=>{console.log("Mongo Connected")})
.catch((err)=>{console.log("Mongo Connection Failed --"+err )});

// Setting Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept , Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


// Auth Controller
app.post("/api/user/login",authController.UserLogin);
app.post("/api/user/register",authController.UserRegister);

app.post("/api/post",upload.single('image'),homeController.AddPost);
app.get("/api/posts",homeController.GetPosts);
app.post("/api/singlepost",homeController.GetPost);
app.post("/api/posts/category",homeController.GetPostsBy);
app.get("/api/categories",homeController.Categories);
app.get("/api/notifications",homeController.Notifications);
app.post("/api/categories/update",homeController.CategoriesUpdate);
app.post("/api/categories/add",homeController.CategoriesAdd);
app.post("/api/getuser",homeController.GetUser);
app.post("/api/updateuser",homeController.UpdateUser);
app.post("/api/updateuserpass",homeController.UpdateUserPass);

//news
app.get("/api/news",newsController.GetNews);
app.post("/api/news",newsController.GetNewsbyID);
app.post("/api/news/add",upload.single('image'),newsController.AddNews);
app.post("/api/news/update",newsController.UpdateNews);
app.post("/api/news/delete",newsController.DeleteNews);
app.post("/api/news/cate/add",newsController.AddCate);
app.post("/api/news/cate/delete",newsController.DeleteCate);





app.use('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
  console.log('main called');
  
})
module.exports = app;
