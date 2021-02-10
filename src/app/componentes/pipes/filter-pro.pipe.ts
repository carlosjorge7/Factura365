import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPro'
})
export class FilterProPipe implements PipeTransform {

  // ProductTax2Rate y CategoryName y ProductPriceSale--> no lo pilla 
  transform(value: any, arg: any): any {
    const resultProductos = [];
    for(var pro of value){
      if(pro.ProductName.toLowerCase().indexOf(arg) > -1 ||
        pro.ProductName.indexOf(arg) > -1 /*||
        pro.ProductDescription.toLowerCase().indexOf(arg) > -1 ||
        pro.ProductDescription.indexOf(arg) > -1 ||
        pro.ProductPriceSale.indexOf(arg) > -1 
        pro.ProductTax1Rate.indexOf(arg) > -1 ||
        pro.ProductTax1Rate.indexOf(arg) > -1 */){
          resultProductos.push(pro);
      };
    };
    return resultProductos;
  }

}
