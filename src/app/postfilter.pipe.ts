import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postfilter'
})
export class PostfilterPipe implements PipeTransform {
  transform(items: any[], value:string, label:string, sub:string, type:string): any[] {
    console.log(value);
    
    if (!items) return [];
    if (!value) return  items;
    if (value == '' || value == null) return items;
    if( sub!=undefined && type!= undefined ){ return items.filter(e => { return e[label]==value && e['subcategory']==sub && e['type']==type} );}
    if( sub!=undefined ){ return items.filter(e => { return e[label]==value && e['subcategory']==sub} );}
    if(value!='' && sub==undefined){return items.filter(e => e[label]==value );}
  }
}
