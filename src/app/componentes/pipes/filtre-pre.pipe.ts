import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrePre'
})
export class FiltrePrePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPresupuestos = [];
    for(var pre of value){
      if(pre.EstimateDate.indexOf(arg) > -1 ||
        pre.EstimateNumber.toLowerCase().indexOf(arg) > -1 ||
        pre.EstimateNumber.indexOf(arg) > -1 ||
        pre.PurchaseOrder.indexOf(arg) > -1 ||
        pre.CustomerName.toLowerCase().indexOf(arg) > -1  ||
        pre.CustomerName.indexOf(arg) > -1 ||
        pre.StatusName.toLowerCase().indexOf(arg) > -1 ||
        pre.StatusName.indexOf(arg) > -1 || 
        pre.DueDate.indexOf(arg) > -1 ||
        pre.Total.indexOf(arg) > -1 ){
          resultPresupuestos.push(pre);
      };
    };
    return resultPresupuestos;
  }

}
