import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pmitr'
})
export class PmitrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Array.from(value);
  }


}
