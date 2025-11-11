import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeLetter',
  standalone: true
})
export class CapitalizeLetterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    // Capitaliza solo la primera letra de cada palabra
    return value
      .split(' ')
      .map(word => {
        if (word.length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

}
