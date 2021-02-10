import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPagos'
})
export class FilterPagosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPagos = [];
    for(var pa of value){
      if(pa.PaymentDate.toLowerCase().indexOf(arg) > -1 ||
        pa.CustomerName.indexOf(arg) > -1 ||
        pa.CustomerName.toLowerCase().indexOf(arg) > -1 ||
        pa.InvoiceNumber.toLowerCase().indexOf(arg) > -1 ||
        pa.InvoiceNumber.indexOf(arg) > -1 ||
        pa.PaymentMethod.toLowerCase().indexOf(arg) > -1 ||
        pa.PaymentMethod.indexOf(arg) > -1 ||
        pa.PaymentAmount.indexOf(arg) > -1 ||
        //pa.PaymentReference.toLowerCase().indexOf(arg) > -1 ||
        pa.PaymentDescription.indexOf(arg) > -1 ||
        pa.PaymentDescription.toLowerCase().indexOf(arg) > -1 
        ){
        resultPagos.push(pa);
      };
    };
    return resultPagos;
  }

}
