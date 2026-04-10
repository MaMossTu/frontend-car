import { Subscription } from 'rxjs';
import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
    MatDialog,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Service } from '../page.service';

// Define custom date format
export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-payment-form',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
})
export class DialogDetail implements OnInit {
    form: FormGroup;
    stores: any[] = [];
    invoice_payment: any[] = [];
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    type: string = '';
    selectedTime: string = '00:00';
    selectedDate: Date = new Date();

    payment: any[] = [
        { value: 'paid_cash', name: 'เงินสด' },
        { value: 'paid_tran', name: 'เงินโอน' },
        { value: 'credit', name: 'เครดิต' },
    ]

    constructor(
        private dialogRef: MatDialogRef<DialogDetail>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        private fuseConfirmationService: FuseConfirmationService,
        private _service: Service
    ) {
        this.data.id
        this.type = this.data.type
        this.invoice_payment = this.data.invoice_payment
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        const currentTimeString = currentDate.toTimeString().split(' ')[0]; // Format as HH:mm:ss

        this.form = this.FormBuilder.group({
            id: [''],
            call_log: [currentDateString, Validators.required],
            call_log_details: [''],
        });
    }

    ngOnInit(): void {

        this.form.patchValue({
            id: this.data.values.id,
            call_log: this.data.values.call_log,
            call_log_details: this.data.values.call_log_details,
        });
    }


    Submit() {
        if (this.form.invalid) {
            return;
        }

        const formValue = {
            id: this.form.get('id').value,
            call_log: this.form.get('call_log').value,
            call_log_details: this.form.get('call_log_details').value
        };

        const confirmation = this.fuseConfirmationService.open({
            title: "ยืนยันการบันทึกข้อมูล",
            icon: {
                show: true,
                name: "heroicons_outline:exclamation",
                color: "primary"
            },
            actions: {
                confirm: {
                    show: true,
                    label: "ยืนยัน",
                    color: "primary"
                },
                cancel: {
                    show: true,
                    label: "ยกเลิก"
                }
            },
            dismissible: false
        });

        confirmation.afterClosed().subscribe(
            result => {
                if (result == 'confirmed') {
                    this._service.updateCallLog(formValue, formValue.id).subscribe({
                        error: (err) => {
                            // this.toastr.error('ไม่สามารถบันทึกข้อมูลได้')
                        },
                        complete: () => {
                            // this.toastr.success('ดำเนินการเพิ่มข้อมูลสำเร็จ')
                            this.dialogRef.close(true)
                        },
                    });
                }
            }
        );
    }

    onClose() {
        this.dialogRef.close()
    }
}
