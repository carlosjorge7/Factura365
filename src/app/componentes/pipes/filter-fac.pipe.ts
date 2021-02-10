import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFac'
})
export class FilterFacPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFacturas = [];
    for(var fac of value){
      if(fac.InvoiceDate.indexOf(arg) > -1 ||
        fac.TypeName.toLowerCase().indexOf(arg) > -1 ||
        fac.TypeName.indexOf(arg) > -1 ||
        fac.InvoiceNumber.toLowerCase().indexOf(arg) > -1 ||
        fac.InvoiceNumber.indexOf(arg) > -1 ||
        fac.PurchaseOrder.indexOf(arg) > -1 ||
        fac.CustomerName.toLowerCase().indexOf(arg) > -1  ||
        fac.CustomerName.indexOf(arg) > -1 ||
        fac.StatusName.toLowerCase().indexOf(arg) > -1 ||
        fac.StatusName.indexOf(arg) > -1 || 
        fac.DueDate.indexOf(arg) > -1 ||
        fac.Total.indexOf(arg) > -1 ){
          resultFacturas.push(fac);
      };
    };
    return resultFacturas;
  }

}
