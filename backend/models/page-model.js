var mongoose = require('mongoose');

const PageSchema = mongoose.Schema({
    title: { type : String},
    des: { type : String},
    posts:[{type:mongoose.SchemaTypes.ObjectId, ref:'Post'}],
    user:{type:mongoose.SchemaTypes.ObjectId, ref:'User'},
    category: {type:String},
    subcategory: {type:String},
    city: {type:String},
    image :{ type : String},
    date: {type: Date}
});
module.exports= mongoose.model('Page', PageSchema, 'Page');
