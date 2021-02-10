import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // categorias
  transform(value: any, arg: any): any {
    const resultCategorias = [];
    for(var categ of value){
      if(categ.CategoryName.toLowerCase().indexOf(arg) > -1 ||
        categ.CategoryName.indexOf(arg) > -1 /*||
        categ.CategoryName_Parent.toLowerCase().indexOf(arg) > -1 
        categ.CategoryName_Parent.indexOf(arg) > -1*/
        ){
        resultCategorias.push(categ);
      };
    };
    return resultCategorias;
  }


}
