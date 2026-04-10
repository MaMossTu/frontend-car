import { values } from 'lodash';
import { data } from 'jquery';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDataService } from 'app/modules/matdynamic/form-data.service';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
    value: any;
    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        private _formDataService: FormDataService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.value = data.values;
    }

    ngOnInit(): void {}

    close(result: string): void {
        this.dialogRef.close(result);
    }

    getServiceNames(): string {
        return this.value.List_service_tran.filter(
            (service) => service.status === 1
        )
            .map(
                (service) =>
                    `${service.service_name} (${service.service_price} บาท)`
            )
            .join(', ');
    }

    getFilteredServices() {
        return this.value.List_service_tran.filter(
            (service) => service.status === 1
        );
    }
}
