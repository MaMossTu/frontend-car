import {
    LOCALE_ID,
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ViewChild,
    ViewChildren,
    QueryList,
    TemplateRef,
    ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Service } from '../page.service';
import { DataTableDirective } from 'angular-datatables';
import { UtilityService, DATE_TH_FORMATS, CustomDateAdapter } from 'app/app.utility-service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormDataService } from 'app/modules/matdynamic/form-data.service';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: DATE_TH_FORMATS },
        { provide: LOCALE_ID, useValue: 'th-TH-u-ca-gregory' },
        { provide: MAT_DATE_LOCALE, useValue: 'th-TH' }
    ],
    animations: fuseAnimations,
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
    form: FormGroup;
    formFieldHelpers: string[] = ['fuse-mat-dense'];

    public dataRow: any[] = [];
    public subdataRow: any[] = [];
    public dtOptions: DataTables.Settings = {};
    public formData: FormGroup;
    public createResp: any[] = [];
    public updateResp: any[] = [];
    public deleteResp: any[] = [];
    public employeeType: any[] = [];
    public flashMessage: 'success' | 'error' | null = null;
    public isLoading = false;
    public currentStart = 0;
    public pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    public isEdit = false;
    public dialogWidth = 80;

    @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
    @ViewChild(MatPaginator) _paginator: MatPaginator;
    @ViewChild('Dialog') Dialog: TemplateRef<any>;

    private start: number;
    private readonly _destroy$ = new Subject<void>();
    private selectedCustomerName = '';

    customers: any[] = [];
    customerFilter = new FormControl('');
    filterCustomer: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    items: any[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirm: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: Service,
        private _matDialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
        private _formDataService: FormDataService,
        private _US: UtilityService,
    ) {
        this.customers = this._activatedRoute.snapshot.data.customers?.data ?? [];
        this.filterCustomer.next(this.customers.slice());

        this.form = this._formBuilder.group({
            customer_id: '',
            customer_phone: '',
            license_plate: '',
            start_date: null,
            end_date: null,
        });

        this.formData = this._formBuilder.group({
            name: '',
            id: ['', Validators.required],
        });
        this._formDataService.setFormGroup('formData', this.formData);

        this.customerFilter.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((value) => {
                if (typeof value === 'string' && value !== this.selectedCustomerName) {
                    this.selectedCustomerName = '';
                    if (this.form.get('customer_id')?.value) {
                        this.form.patchValue({ customer_id: '' }, { emitEvent: false });
                    }
                }

                this._filterCustomer();
            });
    }

    protected _filterCustomer(): void {
        if (!this.customers) {
            return;
        }

        const rawSearch = this.customerFilter.value;
        if (typeof rawSearch !== 'string' || !rawSearch.trim()) {
            this.filterCustomer.next(this.customers.slice());
            return;
        }

        const search = rawSearch.trim().toLowerCase();
        this.filterCustomer.next(
            this.customers.filter(item =>
                (item?.name ?? '').toLowerCase().includes(search)
            )
        );
    }

    async ngOnInit(): Promise<void> {
        this._activatedRoute.queryParams
            .pipe(takeUntil(this._destroy$))
            .subscribe(params => this.start = params['start']);
    }

    ngAfterViewInit(): void { }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    loadTable(): void {
        this._US.loadTable(this, this._Service, this._changeDetectorRef, this.pages, this, this.start, this);
    }

    create(): void {
        this._US.createItem(this._Service, this._fuseConfirm, this.submitForm.bind(this), this.createResp);
    }

    update(): void {
        this._US.updateItem(this.formData, this._Service, this._fuseConfirm, this.submitForm.bind(this), this.updateResp);
    }

    delete(id: any): void {
        this._US.deleteItem(id, this._Service, this._fuseConfirm, this.rerender.bind(this), this.deleteResp);
    }

    openDialog(item?: any, event?: Event): void {
        if (event) {
            event.stopPropagation();
        }

        item ? (this.formData.patchValue(item), this.isEdit = true) : (this.isEdit = false);
        this._US.openDialog(this._matDialog, this.Dialog, this.dialogWidth, this.formData);
    }

    closeDialog(Ref?: any): void {
        Ref ? this._US.closeDialog(Ref) : this._matDialog.closeAll();
    }

    rerender(): void {
        this.dtElements.forEach((dtElement: DataTableDirective) => {
            dtElement.dtInstance.then((dtInstance: any) => dtInstance.ajax.reload());
        });
    }

    showEdit(): boolean { return this._US.hasPermission(1); }
    showDelete(): boolean { return this._US.hasPermission(1); }
    showFlashMessage(type: 'success' | 'error'): void { this._US.showFlashMessage(type, this._changeDetectorRef, this); }

    private submitForm(action: (formData: FormData) => Observable<any>): void {
        this._US.submitForm(
            this.formData,
            action,
            this._changeDetectorRef,
            this._fuseConfirm,
            this,
            this.rerender.bind(this),
            this.closeDialog.bind(this)
        );
    }

    selectCustomer(event: any): void {
        const selectedName = event.option.value;
        const selected = this.customers.find(item => item.name === selectedName);

        if (selected) {
            this.selectedCustomerName = selected.name;
            this.form.patchValue({
                customer_id: selected.id
            });
            this.customerFilter.setValue(selected.name);
        }
    }

    GetReport(): void {
        const v = this.form.getRawValue();

        const start_date = v.start_date
            ? formatDate(v.start_date, 'yyyy-MM-dd', 'en-US')
            : '';

        const end_date = v.end_date
            ? formatDate(v.end_date, 'yyyy-MM-dd', 'en-US')
            : '';

        const params = {
            customer_id: v.customer_id || '',
            customer_phone: v.customer_phone || '',
            license_plate: v.license_plate || '',
            start_date,
            end_date,
        };

        this.isLoading = true;
        this._Service.getReport(params)
            .pipe(takeUntil(this._destroy$))
            .subscribe({
                next: (resp: any) => {
                    this.items = Array.isArray(resp?.data) ? resp.data : [];
                    this.isLoading = false;
                    this._changeDetectorRef.markForCheck();
                },
                error: () => {
                    this.items = [];
                    this.isLoading = false;
                    this.showFlashMessage('error');
                }
            });
    }

    clearData(): void {
        this.form.reset();
        this.form.patchValue({
            customer_id: '',
            customer_phone: '',
            license_plate: '',
            start_date: null,
            end_date: null,
        });
        this.customerFilter.setValue('', { emitEvent: false });
        this.selectedCustomerName = '';
        this.filterCustomer.next(this.customers.slice());
        this.items = [];
        this._changeDetectorRef.markForCheck();
    }

    exportPDF(id: any): void {
        window.open(environment.API_URL + '/api/WorkOrder/pdf/' + id, '_blank');
    }

    export(): void {
        const element = document.getElementById('excel-table');
        if (!element) {
            return;
        }

        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'รายงานซ่อมบำรุง.xlsx');
    }
}
