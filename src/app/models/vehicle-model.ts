interface Vehicle{
    name: "Vehicles",
    type:Array<String>,
    hasType:Boolean,
        categories:Array<{name:String, subcategory:Array<String>}>
}
        
export var Vehicle :Vehicle = {
    name: "Vehicles",
    hasType:true,
        categories:[
            {
                name:"Rental",
                subcategory:["Villa","Apparment","Shared",]
            },
            {
                name:"For Sale",
                subcategory:["Apparment","Villa","Retail"]
            }
        ],
        type:["Bike","Car","Truck","4x4"],

}