import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const currentDate = new Date();
const nextMonth = new Date(currentDate);
nextMonth.setMonth(nextMonth.getMonth() - 1);

@Injectable({
    providedIn: 'root',
})
export class FormDataFrame {
    constructor(private _formBuilder: FormBuilder) {}

    createMainForm(): FormGroup {
        return this._formBuilder.group({
            id: ['', Validators.required],
            no: '',
            vehicle_inspection_types_id: '',
            insurance_types_id: '',
            regeister_date: '',
            cc: '',
            weight: '',
            tax_due_date: '',
            tax_renewal_date: '',
            fuel_type: '',
            appointment: '',
            tax: '',
            type_document: '',
            status: '',
            tax_vehicle: '',
            vehicle_id: '',
            employee_id: '',
            branch_id: '',
            EMS: '',
            result: '',
            comments: '',
            created_at: '',
            updated_at: '',
            license_plate: '',
            name: '',
            service_price: '',
            date: [new Date().toISOString().split('T')[0]],
            installment_date: [new Date().toISOString().split('T')[0]],
            startDate: [nextMonth],
            endDate: [currentDate],

            description:[''],
            total: ['0.00'],
            discount: 0,
            remaining_amount:[''],
            last_price: [''], // temporary value(delete on contact backend)
            paid_price: [''], // temporary value(delete on contact backend)
            now_paid: [''], // temporary value(delete on contact backend)
            now_paid_vat: [''], // temporary value(delete on contact backend)
            change_price: [''], // temporary value(delete on contact backend)
            change_price_vat: [''], // temporary value(delete on contact backend)

            service_transactions: this._formBuilder.array([]),

            //=============================
            total_vatcal: 0,
            total_nonvatcal: 0,
            overdue_vat: 0,
            overdue_nonvat: 0,
            // total : 0,
            total_vat : 0,
            total_nonvat :  0,
            discount_after_vat :  0,
            discount_before_vat : 0,
        });
    }

    createPaidDataForm(): FormGroup {
        return this._formBuilder.group({
            id: [''],

            status: [''],
            discount: [''],
            paid_type: [''],
            total: [''],
            description: [''],
        });
    }
}
