var mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: { type : String},
    des: { type : String},
    date: {type:String},
    category: {type:String},
    views:{type:Number},
    tags:[{type:String}],
    image :{ type : String},
});

module.exports= mongoose.model('news', NewsSchema, 'news');
