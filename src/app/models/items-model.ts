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
            name:"For Sale",
            subcategory: ["Villa", "Apparment", "Shared"]
        }
    ],
    type:["Accessories","Mobile Phones","Furniture","Electronics"],

}