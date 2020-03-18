import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newspipe'
})
export class NewspipePipe implements PipeTransform {
  transform(items: any[], value:string, label:string): any[] {
    if (!items) return [];
    if (!value) return  items;
    console.log(value);
    
    return items.filter(item=>{return (item.title.toLowerCase().includes(value.toLowerCase())) })

    // if( sub!=undefined && type!= undefined ){ return items.filter(e => { return e[label]==value && e['subcategory']==sub && e['type']==type} );}
    // if( sub!=undefined ){ return items.filter(e => { return e[label]==value && e['subcategory']==sub} );}
  }
}
