var mongoose = require('mongoose');

const ShowroomSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    posts:[{type: mongoose.Schema.Types.ObjectId, ref:'Post'}],
    title: { type : String},
    image: {type:String},
    address: {type:String},
    city:{type:String},
    des:{type:String},
    type:{type:String},
});

module.exports= mongoose.model('Showroom', ShowroomSchema, 'Showroom');
