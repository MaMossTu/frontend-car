import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormDataFrame {
    constructor(private _formBuilder: FormBuilder) {}

    createMainForm(): FormGroup {
        return this._formBuilder.group({
            id: ['', Validators.required],
            name: '',
            business_name: '',
            phone: '',
            email: '',
            logo: '',
            logo_nuder: '',
            license_number: '',
            cal_com: '',
            address: '',
            open_close_time: '',
            open_date: '',
            tax_id: '',
            approval_letter_number: '',
            expiration_date: '',
            logo_url: '', // use for display
            logo_under_url: '', // use for display
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
