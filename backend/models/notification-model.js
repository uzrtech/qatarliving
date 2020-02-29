var mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    date:{type:Date},
    text: {type : String},
    name:{type:String},
    for:{type:String},
    post_id :{ type:mongoose.Schema.Types.ObjectId, ref: 'Post'},
    user_id :{ type:mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports= mongoose.model('Notification', NotificationSchema);
