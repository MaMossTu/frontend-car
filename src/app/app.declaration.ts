import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'TH' }) export class ThDatePipe implements PipeTransform {
    transform(value: any, format: string = 'DD/MM/YYYY'): any {
        if (!value) return '';
        const date = moment(value);
        const TH_Year = date.year() + 543;

        return date.format(format).replace(date.year().toString(), TH_Year.toString());
    }
}
