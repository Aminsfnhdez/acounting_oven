import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'methodLabel'
})
export class MethodLabelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
