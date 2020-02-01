var mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: { type : String},
    des: { type : String},
    type: {type:String},
    category: {type:String},
    subcategory: {type:String},
    city:{type:String},
    price :{ type : String},
    image :{ type : String},
    date: {type: Date}
});

module.exports= mongoose.model('Post', PostSchema, 'Post');