interface Item{
    name: String,
    hasType:Boolean,
    type:Array<String>,
    categories:Array<{name:string, subcategory:Array<string>}>
}

export var Item : Item ={
    name: "Items",
    hasType:true,
    categories:[
        {
            name:"Clothing",
            subcategory: ["Jewelry", "Clothing"]
        },
        {
            name:"Accessories",
            subcategory: ["Mobile Phones", "Tablets"]
        }
    ],
    type:["Accessories","Mobile Phones","Furniture","Electronics"],

}