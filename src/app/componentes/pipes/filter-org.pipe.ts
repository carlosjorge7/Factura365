import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrg'
})
export class FilterOrgPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultOrganizaciones = [];
    for(var org of value){
      if(org.OrganizationName.toLowerCase().indexOf(arg) > -1){
        resultOrganizaciones.push(org);
      };
    };
    return resultOrganizaciones;
  }

}
