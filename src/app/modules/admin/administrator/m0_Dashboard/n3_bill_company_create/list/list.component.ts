// Angular core imports
import { LOCALE_ID, Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewChildren,
    QueryList, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Angular Material imports
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

// RxJS imports
import { map, Observable, of, startWith, switchMap, tap, Subject, firstValueFrom, lastValueFrom, forkJoin } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Custom imports
import { DecimalPipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { Service } from '../page.service';
import { DataPosition, AssetType, Pagination } from '../page.types';
import { FormDataFrame } from './list.mainframe';
import { UtilityService, DATE_TH_FORMATS, CustomDateAdapter } from 'app/app.utility-service';
import { FormDataService } from 'app/modules/matdynamic/form-data.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: DATE_TH_FORMATS },
        { provide: LOCALE_ID, useValue: 'th-TH-u-ca-gregory' },
        { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
        DecimalPipe,
    ],
    animations: fuseAnimations,
})
export class CompanyVehicleComponent implements OnInit {
    public dtOptions: DataTables.Settings = {};
    public formData: FormGroup;

    public prb_service_cache: FormControl;

    public formData_vehicle: FormGroup;
    public formData_address: FormGroup;
    public formData_PaidData: FormGroup;
    public formData_Customer: FormGroup;
    public formData_ActPeriod: FormGroup;
    public formData_InsurData: FormGroup;

    // customer_car
    public formData_CusCar: FormGroup;
    public formGas_Edit: FormGroup;
    public formGas_Add: FormGroup;

    // customer_data
    public formData_CusData: FormGroup;
    public formAddress_CusData: FormGroup;

    // carcheck
    public formData_CarCheck: FormGroup;

    /** CRUD Operations respones storage */
    public createResp: any[] = [];
    public updateResp: any[] = [];
    public deleteResp: any[] = [];
    public outputState: string = 'create';

    /** GET partition data */
    public listProvinces: any[] = [];
    public listdistricts: any[] = [];
    public listSubDistricts: any[] = [];
    public listcustomer: any[] = [];
    public listcustomerNo: any[] = [];
    public listVehicles: any[] = [];
    public list: any[] = [];
    public listEmployee: any[] = [];
    public listBranch: any[] = [];
    public listVehicleInspection: any[] = [];
    public listInsuranceName: any[] = [];
    public listInsurRenewType: any[] = [];
    public listGasBrands: any[] = [];

    public listVehicleInspectionTypes: any;
    public listInsuranceTypes: any;

    public isVehicleTypeSelected: boolean = false;

    public isTaxChecked: boolean = false;
    public isLPGChecked: boolean = false;
    public isNGVChecked: boolean = false;
    public isActChecked: boolean = false;
    public isInsurChecked: boolean = false;
    public isOtherChecked: boolean = false;

    /** GET partition analyse */
    public filteredProvinces: Observable<string[]>;
    public filteredProvincesAddress: Observable<string[]>;
    public filteredDistricts: Observable<string[]>;
    public filteredSubDistricts: Observable<string[]>;
    public filteredCustomers: Observable<any[]>;
    public filteredCustomerNo: Observable<any[]>;
    public filteredVehicles: Observable<any[]>;
    public filteredInsuranceTypes: Observable<any[]>;

    public provinces: any;



    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirm: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: Service,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _formDataFrame: FormDataFrame,
        private _formDataService: FormDataService,
        private _US: UtilityService,
    ) {
        /**
         *
         * @formgroup สร้าง formgroup ผ่านฟังก์ชันเพื่อลดการใช้พื้นที่บนสคริปต์หลัก
         */
        this.formData = this._formDataFrame.createMainForm();
        this._formDataService.setFormGroup('formData', this.formData);

        this.formData_address = this._formDataFrame.createAddressForm();
        this._formDataService.setFormGroup('formData_address', this.formData_address);

        this.formData_Customer = this._formDataFrame.createCustomerForm();
        this._formDataService.setFormGroup('formData_Customer', this.formData_Customer);

        this.formData_ActPeriod = this._formDataFrame.createActPeriodForm();
        this._formDataService.setFormGroup('formData_ActPeriod', this.formData_ActPeriod);

        this.formData_InsurData = this._formDataFrame.createInsurDataForm();
        this._formDataService.setFormGroup('formData_InsurData', this.formData_InsurData);

        this.formData_PaidData = this._formDataFrame.createInstallmentForm();
        this._formDataService.setFormGroup('formData_PaidData', this.formData_PaidData);

        /**
         *
         * @formgroup คัดลอกจาก customer_car
         * @function addGroup สร้าง array ล่วงหน้า
         */
        this.formData_CusCar = this._formDataFrame.createCusCarForm();
        this._formDataService.setFormGroup('formData_CusCar', this.formData_CusCar);

        this.formGas_Edit = this._formDataFrame.createGasEditForm();
        this._formDataService.setFormGroup('formGas_Edit', this.formGas_Edit);

        this.formGas_Add = this._formDataFrame.createGasAddForm();
        this._formDataService.setFormGroup('formGas_Add', this.formGas_Add);

        // this.addGroup();

        /**
         *
         * @formgroup คัดลอกจาก customer_data
         */
        this.formData_CusData = this._formDataFrame.createCusDataForm();
        this._formDataService.setFormGroup('formData_CusData', this.formData_CusData);

        this.formAddress_CusData = this._formDataFrame.createCusDataAddressForm();
        this._formDataService.setFormGroup('formAddress_CusData', this.formAddress_CusData);

        /**
         *
         * @formgroup คัดลอกจาก carcheck
         */
        this.formData_CarCheck = this._formDataFrame.createCarCheckForm();
        this._formDataService.setFormGroup('formData_CarCheck', this.formData_CarCheck);
    }

    private addGroup(): void {
        // Add your logic here
    }

    ngOnInit(): void {
        // this.filteredVehicles = this.formData
        //     .get('company_name')!
        //     .valueChanges.pipe(
        //         startWith(''),
        //         map((value) => this._filterVehicles(value))
        //     );

        // this.filteredProvinces = this.formData
        //     .get('address')!
        //     .valueChanges.pipe(
        //         startWith(''),
        //         map((value) => this._filterProvinces(value))
        //     );
    }

    get vehiclesFormArray(): FormArray {
        return this.formData.get('vehicles') as FormArray;
    }

    addVehicle(): void {
        const vehicleForm = this._formBuilder.group({
            vehicle_inspection_types_id: [null, Validators.required],
            license_plate: ['', Validators.required],
            province: ['', Validators.required],
            cc: [null, Validators.required],
            weight: [null, Validators.required],
            tax_due_date: [''],
        });
        this.vehiclesFormArray.push(vehicleForm);
    }

    removeVehicle(index: number): void {
        this.vehiclesFormArray.removeAt(index);
    }

    onVehicleTypeChange(value: any): void {
        // เขียน logic ที่ต้องการเมื่อเลือกประเภทรถ
        console.log('Vehicle Type Changed:', value);
    }

    openAddressDialog(): void {
        // เปิด dialog สำหรับกรอกที่อยู่
        console.log('Open Address Dialog');
    }

    onDateInput(event: any): void {
        // จัดการการเปลี่ยนแปลงข้อมูลของวันที่นัดรับ
        console.log('Date Input:', event);
    }

    onDateChange(event: any, controlName: string, formGroup: FormGroup): void {
        formGroup.get(controlName)?.setValue(event.value);
    }

    noNaN(event: KeyboardEvent): void {
        if (isNaN(Number(event.key)) && event.key !== 'Backspace') {
            event.preventDefault();
        }
    }

    private _filterVehicles(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.listVehicleInspection.filter((vehicle) =>
            vehicle.name?.toLowerCase().includes(filterValue)
        );
    }

    private _filterProvinces(value: string):any[] {
        const filterValue = value.toLowerCase();
        return this.provinces.filter((province) =>
            province.name_th.toLowerCase().includes(filterValue)
        );
    }

    onVehicleSelected(data: any) {

    }
    setFuelType(data: any) {

    }
    setCorporateStatus() {

    }
    public selectedFuelType: string | null = null;
    isCorporate: boolean = false;
}
