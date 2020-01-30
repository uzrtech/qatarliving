interface Property{
    name: string,
        categories:Array<{name:string, subcategory:Array<String>}>
    type:Array<String>,
    hasType:Boolean;
}

export var Property: Property = {
    name: "Property",
        categories: [
            {
                name:"Residential",
                subcategory:["Villa", "Apparment","Shared",]
                
            },
            {
                name:"Commercial",
                subcategory: ["Office", "Villa", "Retail",]
                
            },
            {
                name:"For Sale",
                subcategory:["Apparment","Villa","Retail",]
            }
        ],
    type:["APARTMENT","VILLA","SHARED","ACCOMODATION"],
    hasType:true
}