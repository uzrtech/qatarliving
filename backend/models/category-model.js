var mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {type:String},
    cat:[ {
        name:{type:String},
        fields:[
            {title:{type:String},type:{type:String},icon:{type:String}}
        ],
        sub:{type: [String]}
    }],
    fields:[
        {title:{type:String},type:{type:String},icon:{type:String},values:{type:[String]}}
    ]
});

module.exports= mongoose.model('Category', CategorySchema, 'Categories');



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