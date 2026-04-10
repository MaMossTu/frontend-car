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
import { MatRadioModule } from '@angular/material/radio'
import { StockService } from '../../bill/page.service';
import { Service } from '../page.service';

@Component({
    selector: 'app-status-form',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogStatus implements OnInit {

    form: FormGroup;
    stores: any[] = [];
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    type: string = '';
    status: any[] = [
        { value: 'open', name: 'เปิด' },
        { value: 'wait', name: 'รอซ่อม' },
        { value: 'repairing', name: 'กำลังซ่อม' },
        { value: 'success', name: 'เสร็จสิ้น' },
        { value: 'cancel', name: 'ยกเลิก' },
    ]
    payment: any[] = [
        { value: 'paid_cash', name: 'เงินสด' },
        { value: 'paid_tran', name: 'เงินโอน' },
        { value: 'credit', name: 'เครดิต' },
    ]


    constructor(
        private dialogRef: MatDialogRef<DialogStatus>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private FormBuilder: FormBuilder,
        private fuseConfirmationService: FuseConfirmationService,
        private _service: Service
    ) {

        this.data.id
        this.type = this.data.type
        this.form = this.FormBuilder.group({
            status: [this.data.status, Validators.required],
            paid_type: [this.data.paid_type],
        });
        // Subscribe to status changes
        this.form.get('status').valueChanges.subscribe(status => {
            const paidTypeControl = this.form.get('paid_type');

            // if (status === 'success') {
            //     paidTypeControl.setValidators(Validators.required);
            // } else {
            //     paidTypeControl.clearValidators();
            // }

            paidTypeControl.updateValueAndValidity();
        });

        // Initialize validation based on current status
        if (this.data.status === 'success') {
            this.form.get('paid_type').setValidators(Validators.required);
        }
    }

    ngOnInit(): void {

    }

    Submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        let formValue = this.form.value
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
        })

        confirmation.afterClosed().subscribe(
            result => {
                if (result == 'confirmed') {
                    this._service.updateStatus(this.data.id, formValue).subscribe({
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
        )
    }

    onClose() {
        this.dialogRef.close()
    }

}
