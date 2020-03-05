var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{type:String,},
    name: { type : String},
    role:{type:String},
    phone:{type:String},
    address:{type:String},
    Posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    email :{ type:String, require: true , unique : true},
    password :{ type : String, require : true},
    profile_pic :{ type : String},
});

module.exports= mongoose.model('User', UserSchema);
