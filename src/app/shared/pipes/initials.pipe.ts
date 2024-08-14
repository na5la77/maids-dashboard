import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initialsPipe'
})
export class InitialsPipe implements PipeTransform {

  transform(fullName: string): string {
    if (!fullName) return '';

    const names = fullName.split(' ');
    return names.map(name => name.charAt(0).toUpperCase()).join('.');
  }
}
