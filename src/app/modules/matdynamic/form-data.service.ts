import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormDataService {
    private formGroups: { [key: string]: FormGroup } = {};

    setFormGroup(key: string, formGroup: FormGroup): void {
        this.formGroups[key] = formGroup;
    }

    getFormGroup(key: string): FormGroup {
        return this.formGroups[key];
    }
}
