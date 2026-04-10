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
            date_start: '',
            date_end: '',
            amount_paid: '',
            stamp: '',
            tax: '',
            policy_number: '',
            policy_status: '',
            remark: '',
            num: '',
            insurance_names_id: '',

            customer_phone_number: '',
            id_insuran: '',
            insurance_renewal_type_id: '',

            startDate: '',
            endDate: '',
        });
    }
}
