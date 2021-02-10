import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCli'
})
export class FilterCliPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultClientes = [];
    for(var cli of value){
      if(cli.CustomerName.toLowerCase().indexOf(arg) > -1 ||
        cli.CustomerName.indexOf(arg) > -1 ||
        cli.Email.toLowerCase().indexOf(arg) > -1 ||
        cli.Phone.indexOf(arg) > -1 ||
        cli.Email.indexOf(arg) > -1 ||
        cli.Balance.indexOf(arg) > -1 ||
        cli.IdFiscal.indexOf(arg) > -1 
        /*cli.TermDays.indexOf(arg) > -1 */){
          resultClientes.push(cli);
      };
    };
    return resultClientes;
  }

}
