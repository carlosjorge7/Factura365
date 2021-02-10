import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterImp'
})
export class FilterImpPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultImpuestos = [];
    for(var imp of value){
      if(imp.TaxName.toLowerCase().indexOf(arg) > -1 ||
        imp.TaxName.indexOf(arg) > -1  ||
        imp.TaxPercentage.indexOf(arg) > -1  ){
        resultImpuestos.push(imp);
      };
    };
    return resultImpuestos;
  }

}
