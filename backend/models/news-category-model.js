var mongoose = require('mongoose');

const NCategorySchema = mongoose.Schema({
    category: {type:String},
});

module.exports= mongoose.model('NewsCategory', NCategorySchema, 'NewsCategory');



// var cat = new Cat(
//   {
//     name : "Vehicles",
//     cat:[{
//       name:"Rental",
//       sub:["Bike","Car","Truck",]
//     },{
//       name:"For Sale",
//       sub:["Car","4x4"]
//     }]
//   }
// );