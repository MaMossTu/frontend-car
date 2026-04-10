import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'million'
})
export class MillionPipe implements PipeTransform {

    constructor(private decimalPipe: DecimalPipe) { }

    transform(value: any, digits?: any): any {
        return this.decimalPipe.transform(value / 1000000, digits)
    }

}
