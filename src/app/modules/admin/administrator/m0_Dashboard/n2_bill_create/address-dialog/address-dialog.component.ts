import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDataService } from 'app/modules/matdynamic/form-data.service';


@Component({
  selector: 'address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent {
  addressForm: FormGroup;
  filteredProvincesAddress: any;
  filteredDistricts: any;
  filteredSubDistricts: any;
  cusDataAddressDialog: boolean;

  constructor(
    private dialogRef: MatDialogRef<AddressDialogComponent>,
    private _formDataService: FormDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // รับค่า formGroup และค่าตัวแปรที่จำเป็นจาก data
    // data: { addressForm: FormGroup, cusDataAddressDialog: boolean, filteredProvincesAddress, filteredDistricts, filteredSubDistricts }

    this.addressForm = data.addressForm;
    this.cusDataAddressDialog = data.cusDataAddressDialog;
    this.filteredProvincesAddress = data.filteredProvincesAddress;
    this.filteredDistricts = data.filteredDistricts;
    this.filteredSubDistricts = data.filteredSubDistricts;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveAddress(): void {
    // เมื่อกดบันทึกจะส่งค่า addressForm.value กลับไปให้คอมโพเนนต์หลัก
    this.dialogRef.close(this.addressForm.value);
  }
}
