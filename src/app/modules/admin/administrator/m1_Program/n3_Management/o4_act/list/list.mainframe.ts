import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormDataFrame {
    constructor(private _formBuilder: FormBuilder) {}

    createMainForm(): FormGroup {
        return this._formBuilder.group({
            id: '',
            bill_number: '',
            license_plate: '',
            insurance_name: '',
            id_prb: '',
            date_start: '',
            date_end: '',
            amount_paid: '',
            stamp: '',
            tax: '',
            policy_number: '',
            policy_status: '',
            remark: '',
            customer_phone_number: '',
            num: '',
            insurance_names_id: '',

            startDate: '',
            endDate: '',
        });
    }
}
