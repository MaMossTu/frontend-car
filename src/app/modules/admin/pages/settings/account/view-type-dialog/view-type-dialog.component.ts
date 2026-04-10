import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-type-dialog',
  templateUrl: './view-type-dialog.component.html',
  styleUrls: ['./view-type-dialog.component.scss']
})
export class ViewTypeDialogComponent implements OnInit {

  sizeForm: FormGroup;
  sizes: any[];
  datas: any;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    const { initial, datas } = data;

    this.sizes = initial;
    this.datas = datas;

    this.sizeForm = this._formBuilder.group({
      sizes: this._formBuilder.array([]),
    });

    this.sizes.forEach((e: any) => {
      const sizes = this.sizeForm.get('sizes') as FormArray;
      sizes.push(this._formBuilder.group({
        id: e.id,
        name: e.name,
        size: e.size,
        price: 0,
        size_id: e.size_id,
      }));
    });
  }

  ngOnInit() {
    for (const size of this.sizeForm.controls.sizes['controls']) {
      const p = this.datas.value.printing_costs.find((e: any) => e.asset_size?.id == size.value.id)?.price;
      size.patchValue({
        price: p === undefined ? 0 : p,
      });
    }

    this.sizeForm.disable();
  }

  save() {
    this.dialogRef.close(this.sizeForm.value);
  }
}
