import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'news'
})
export class NewsPipe implements PipeTransform {
    transform(items: any[], value:string): any[] {
      console.log(items);
      
      
      if (!items) return [];
      //items = items.splice(0,3);
      if (!value) return  items;
      return items.filter(item=>{
        return item.category.toLowerCase()==value.toLowerCase();
      })
      
    }
}
