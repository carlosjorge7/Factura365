import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCon'
})
export class FilterConPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultContactos = [];
    for(var con of value){
      if(con.CustomerName.toLowerCase().indexOf(arg) > -1 ||
        con.CustomerName.indexOf(arg) > -1 ||
        con.FirstName.toLowerCase().indexOf(arg) > -1 ||
        con.FirstName.indexOf(arg) > -1 ||
        con.LastName.toLowerCase().indexOf(arg) > -1 ||
        con.LastName.indexOf(arg) > -1 ||
        con.Email.toLowerCase().indexOf(arg) > -1 ||
        con.Email.indexOf(arg) > -1 ||
        con.MobilePhone.indexOf(arg) > -1 ){
          resultContactos.push(con);
      };
    };
    return resultContactos;
  }

}
