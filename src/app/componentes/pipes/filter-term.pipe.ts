import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTerm'
})
export class FilterTermPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultTerminos = [];
    for(var term of value){
      if(term.TermName.toLowerCase().indexOf(arg) > -1 ||
        term.TermName.indexOf(arg) > -1){
          resultTerminos.push(term);
      };
    };
    return resultTerminos;
  }

}
