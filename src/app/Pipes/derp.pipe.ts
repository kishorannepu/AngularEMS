import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'derp'
})
export class DerpPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Array.from(value);
  }

}
