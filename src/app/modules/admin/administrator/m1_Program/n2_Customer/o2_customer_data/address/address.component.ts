import {
  LOCALE_ID, Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of, startWith, switchMap, tap } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Service } from '../page.service';
import {
  UtilityService, DATE_TH_FORMATS, CustomDateAdapter,
} from 'app/app.utility-service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormDataService } from 'app/modules/matdynamic/form-data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_TH_FORMATS },
    { provide: LOCALE_ID, useValue: 'th-TH-u-ca-gregory' },
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
  ],
  animations: fuseAnimations,
})
export class AddressComponent implements OnInit {
  public isLoading = false;
  public dataRow: any[] = [];
  public form!: FormGroup;
  Id: any;
  public formData!: FormGroup;
  public formData_address!: FormGroup;
  public item: any;

  @ViewChild('AddressDialog') AddressDialog!: TemplateRef<any>;
  addressDialogRef: any;
  private editAddressId: number | null = null;

  // แหล่งข้อมูล (คงไว้)
  public listProvinces: any[] = [];
  public listdistricts: any[] = [];
  public listSubDistricts: any[] = [];

  // ข้อมูลสำหรับแสดงผลใน select (ไม่ใช้ Observable/async)
  public filteredProvinces: any[] = [];
  public filteredDistricts: any[] = [];
  public filteredSubDistricts: any[] = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirm: FuseConfirmationService,
    private _formBuilder: FormBuilder,
    private _Service: Service,
    private _matDialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _formDataService: FormDataService,
    private _US: UtilityService,
    private _router: Router
  ) {
    this.Id = this._activatedRoute.snapshot.paramMap.get('id');

    this.formData = this._formBuilder.group({
      id: [''],
      no: ['', Validators.required],
      name: ['', Validators.required],
      lname: [''],
      email: [''],
      phone_number1: [''],
      phone_number2: [''],
      tax_id: [''],
      type: ['', Validators.required],
      is_headquarter: [''],
      address: this._formBuilder.array([]),
    });

    this.formData_address = this._formBuilder.group({
      address: ['', Validators.required],
      zip_code: [''],
      subdistricts: [''],
      districts: [''],
      province: [''],
      subdistrict_id: ['', Validators.required],
      district_id: ['', Validators.required],
      province_id: ['', Validators.required],
      customer_id: ['', Validators.required],
      is_main: [false],
    });
  }

  ngOnInit(): void {
    if (this.Id) {
      this._Service.getCustomerID(this.Id).subscribe((resp) => {
        this.item = resp.data;
        this.formData.patchValue({ ...this.item });
      });
    }

    // โหลดจังหวัดครั้งเดียว
    this._Service.getProvinces().subscribe((resp) => {
      this.listProvinces = resp || [];
      this.filteredProvinces = this.listProvinces.slice();
    });

    // เมื่อ Province เปลี่ยน: reset & โหลด Districts
    this.formData_address.get('province')?.valueChanges
      .pipe(
        startWith(this.formData_address.get('province')?.value || ''),
        tap(() => {
          this.formData_address.patchValue({
            districts: '',
            subdistricts: '',
            province_id: '',
            district_id: '',
            subdistrict_id: '',
            zip_code: '',
          }, { emitEvent: false });
          this.listdistricts = [];
          this.listSubDistricts = [];
          this.filteredDistricts = [];
          this.filteredSubDistricts = [];
        }),
        switchMap((provinceName: string) => {
          const selectedProvince = this.listProvinces.find(p => p.name_th === provinceName);
          const provinceId = selectedProvince?.id || null;
          this.formData_address.get('province_id')?.setValue(provinceId, { emitEvent: false });
          return provinceId ? this._Service.getDistricts(provinceId) : of({ districts: [] });
        })
      )
      .subscribe((resp: any) => {
        this.listdistricts = resp?.districts || [];
        this.filteredDistricts = this.listdistricts.slice();
      });

    // เมื่อ District เปลี่ยน: reset & โหลด Subdistricts
    this.formData_address.get('districts')?.valueChanges
      .pipe(
        startWith(this.formData_address.get('districts')?.value || ''),
        tap(() => {
          this.formData_address.patchValue({
            subdistricts: '',
            district_id: '',
            subdistrict_id: '',
            zip_code: '',
          }, { emitEvent: false });
          this.listSubDistricts = [];
          this.filteredSubDistricts = [];
        }),
        switchMap((districtName: string) => {
          const selectedDistrict = this.listdistricts.find(d => d.name_th === districtName);
          const districtId = selectedDistrict?.id || null;
          this.formData_address.get('district_id')?.setValue(districtId, { emitEvent: false });
          return districtId ? this._Service.getSubDistricts(districtId) : of({ sub_districts: [] });
        })
      )
      .subscribe((resp: any) => {
        this.listSubDistricts = resp?.sub_districts || [];
        this.filteredSubDistricts = this.listSubDistricts.slice();
      });

    // เมื่อ Subdistrict เปลี่ยน: set id + zipcode
    this.formData_address.get('subdistricts')?.valueChanges
      .pipe(startWith(this.formData_address.get('subdistricts')?.value || ''))
      .subscribe((subdistrictName: string) => {
        const selected = this.listSubDistricts.find(s => s.name_th === subdistrictName);
        this.formData_address.get('subdistrict_id')?.setValue(selected?.id || null, { emitEvent: false });
        this.formData_address.get('zip_code')?.setValue(selected?.zip_code || '', { emitEvent: false });
      });
  }

  showEdit(): boolean { return this._US.hasPermission(1); }
  showDelete(): boolean { return this._US.hasPermission(1); }

  backTo() { this._router.navigate(['customer_data/list']); }

  Submit(): void {
    if (this.Id) {
      const confirmation = this._fuseConfirm.open({
        title: 'แก้ไขข้อมูล',
        message: 'คุณต้องการแก้ไขข้อมูลใช่หรือไม่ ',
        icon: { show: false, name: 'heroicons_outline:exclamation', color: 'warning' },
        actions: { confirm: { show: true, label: 'ยืนยัน', color: 'sky' }, cancel: { show: true, label: 'ยกเลิก' } },
        dismissible: true,
      });

      confirmation.afterClosed().subscribe((result) => {
        if (result === 'confirmed') {
          const formValue = this.formData.value;
          this._Service.update(formValue, this.Id).subscribe({
            next: () => this._router.navigate(['customer_data/list']),
            error: (err: any) => {
              this._fuseConfirm.open({
                title: 'กรุณาระบุข้อมูล',
                message: err.error?.message,
                icon: { show: true, name: 'heroicons_outline:exclamation', color: 'warning' },
                actions: { confirm: { show: false }, cancel: { show: false } },
                dismissible: true,
              });
            },
          });
        }
      });
    } else {
      const confirmation = this._fuseConfirm.open({
        title: 'เพิ่มข้อมูล',
        message: 'คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ',
        icon: { show: false, name: 'heroicons_outline:exclamation', color: 'warning' },
        actions: { confirm: { show: true, label: 'ยืนยัน', color: 'sky' }, cancel: { show: true, label: 'ยกเลิก' } },
        dismissible: true,
      });

      confirmation.afterClosed().subscribe((result) => {
        if (result === 'confirmed') {
          const formValue = this.formData.value;
          this._Service.create(formValue).subscribe({
            next: () => this._router.navigate(['customer_data/list']),
            error: (err: any) => {
              this._fuseConfirm.open({
                title: 'กรุณาระบุข้อมูล',
                message: err.error?.message,
                icon: { show: true, name: 'heroicons_outline:exclamation', color: 'warning' },
                actions: { confirm: { show: false }, cancel: { show: false } },
                dismissible: true,
              });
            },
          });
        }
      });
    }
  }

  openAddressDialog(id?: any): void {
    this.formData_address.reset();
    this.editAddressId = id || null;

    if (id) {
      this._Service.getCusAddressById(id).subscribe((resp) => {
        if (resp.status && resp.data) {
          const address = resp.data;
          this.formData_address.patchValue({
            address: address.address,
            province: address.provinces?.name_th,
            province_id: address.province_id,
            districts: address.districts?.name_th,
            district_id: address.district_id,
            subdistricts: address.sub_districts?.name_th,
            subdistrict_id: address.subdistrict_id,
            zip_code: address.zip_code,
            customer_id: address.customer_id,
            is_main: !!address.is_main,
          }, { emitEvent: true });
        } else {
          this.formData_address.patchValue({ customer_id: this.Id, is_main: false });
        }
      });
    } else {
      this.formData_address.patchValue({ customer_id: this.Id, is_main: false });
    }

    this.addressDialogRef = this._matDialog.open(this.AddressDialog, { width: '90%' });
  }

  closeDialog(Ref?: any): void {
    Ref ? this._US.closeDialog(Ref) : this._matDialog.closeAll();
  }

  saveAddress(): void {
    if (!this.formData_address.valid) {
      this._fuseConfirm.open({
        title: 'กรุณาระบุข้อมูล',
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: { show: true, name: 'heroicons_outline:exclamation', color: 'warning' },
        actions: { confirm: { show: false }, cancel: { show: false } },
        dismissible: true,
      });
      return;
    }

    const proceed = () => this.proceedWithSave();

    if (this.formData_address.get('is_main')?.value && !this.editAddressId) {
      const mainConfirm = this._fuseConfirm.open({
        title: 'ยืนยันการตั้งค่าที่อยู่หลัก',
        message: 'การตั้งค่าที่อยู่นี้เป็นที่อยู่หลักจะยกเลิกที่อยู่หลักเดิม คุณต้องการดำเนินการต่อหรือไม่?',
        icon: { show: false, name: 'heroicons_outline:exclamation', color: 'warning' },
        actions: { confirm: { show: true, label: 'ยืนยัน', color: 'sky' }, cancel: { show: true, label: 'ยกเลิก' } },
        dismissible: true,
      });
      mainConfirm.afterClosed().subscribe((r) => r === 'confirmed' && proceed());
    } else {
      proceed();
    }
  }

  private proceedWithSave(): void {
    const confirmation = this._fuseConfirm.open({
      title: this.editAddressId ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล',
      message: `คุณต้องการ${this.editAddressId ? 'แก้ไข' : 'เพิ่ม'}ข้อมูลใช่หรือไม่`,
      icon: { show: false, name: 'heroicons_outline:exclamation', color: 'warning' },
      actions: { confirm: { show: true, label: 'ยืนยัน', color: 'sky' }, cancel: { show: true, label: 'ยกเลิก' } },
      dismissible: true,
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        const formValue = { ...this.formData_address.value, is_main: this.formData_address.value.is_main ? 1 : 0 };

        const observable = this.editAddressId
          ? this._Service.updateCusAddress(formValue, this.editAddressId)
          : this._Service.createCusAddress(formValue);

        observable.subscribe({
          next: (resp) => {
            if (resp.status) {
              this._Service.getCustomerID(this.Id).subscribe((r) => {
                if (r.status) {
                  this.item = r.data;
                  this._changeDetectorRef.markForCheck();
                }
                this.closeDialog(this.addressDialogRef);
                this.editAddressId = null;
              });
            }
          },
          error: (err) => console.error(err),
        });
      }
    });
  }

  deleteAddress(id: number): void {
    const confirmation = this._fuseConfirm.open({
      title: 'ลบข้อมูล',
      message: 'คุณต้องการลบข้อมูลใช่หรือไม่',
      icon: { show: false, name: 'heroicons_outline:exclamation', color: 'warning' },
      actions: { confirm: { show: true, label: 'ยืนยัน', color: 'sky' }, cancel: { show: true, label: 'ยกเลิก' } },
      dismissible: true,
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._Service.deleteCusAddress(id).subscribe({
          next: (resp) => {
            if (resp.status) {
              this._Service.getCustomerID(this.Id).subscribe((r) => {
                if (r.status) {
                  this.item = r.data;
                  this._changeDetectorRef.markForCheck();
                }
              });
            }
          },
          error: (err) => {
            this._fuseConfirm.open({
              title: 'เกิดข้อผิดพลาด',
              message: err.error?.message || 'เกิดข้อผิดพลาดในการลบข้อมูล',
              icon: { show: true, name: 'heroicons_outline:exclamation', color: 'warning' },
              actions: { confirm: { show: false }, cancel: { show: false } },
              dismissible: true,
            });
          },
        });
      }
    });
  }
}
