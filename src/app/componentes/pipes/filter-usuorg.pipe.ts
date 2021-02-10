import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsuorg'
})
export class FilterUsuorgPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultUsuorg = [];
    for(var uo of value){
      if(uo.Email.toLowerCase().indexOf(arg) > -1 ||
        uo.Email.indexOf(arg) > -1 ||
        uo.RoleName.toLowerCase().indexOf(arg) > -1 ||
        uo.RoleName.indexOf(arg) > -1){
          resultUsuorg.push(uo);
      };
    };
    return resultUsuorg;
  }

}
