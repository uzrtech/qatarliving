var mongoose = require('mongoose');

const PageCategorySchema = mongoose.Schema({
    category: {type:String},
    image:{type:String}
});

module.exports= mongoose.model('PageCategory', PageCategorySchema, 'PageCategories');