import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormDataFrame {
    constructor(private _formBuilder: FormBuilder) {}

    createMainForm(): FormGroup {
        return this._formBuilder.group({
            first_name: '',
            last_name: '',
            email: '',
            phone_number1: '',
            phone_number2: '',
        });
    }

    createAddressForm(): FormGroup {
        return this._formBuilder.group({
            address: [''],
            zip_code: [''],
            subdistricts: [''],
            districts: [''],
            province: [''],
            subdistrict_id: [''],
            district_id: [''],
            province_id: [''],
        });
    }
}
