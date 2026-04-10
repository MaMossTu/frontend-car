import { LOCALE_ID, Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewChildren,
    QueryList, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Service } from '../page.service';
import { DataTableDirective } from 'angular-datatables';
import { UtilityService, DATE_TH_FORMATS, CustomDateAdapter } from 'app/app.utility-service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormDataService } from 'app/modules/matdynamic/form-data.service';
import { AuthService } from 'app/core/auth/auth.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { values } from 'lodash';

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

    // Properties and ViewChilds
    public dtOptions: DataTables.Settings = {};
    public dtOptions2: DataTables.Settings = {};
    public dtOptions3: DataTables.Settings = {};
    public dtOptions4: DataTables.Settings = {};
    public dataRow: any[] = [];
    public dataRow2: any[] = [];
    public dataRow3: any[] = [];
    public dataRow4: any[] = [];
    public formData: FormGroup;
    public createResp: any[] = [];
    public updateResp: any[] = [];
    public deleteResp: any[] = [];
    public flashMessage: 'success' | 'error' | null = null;
    public isLoading: boolean = false;
    public currentStart: number = 0;
    public isEdit: boolean = false;
    public dialogWidth: number = 40; // scale in %
    public tabsLoaded = [false, false, false, false];
    selectedIndex: number = 0;

    @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
    @ViewChild(MatPaginator) _paginator: MatPaginator;
    @ViewChild('Dialog') Dialog: TemplateRef<any>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private start: number;
    private _formDataService: any;
    public status: FormGroup;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirm: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        // private _Service: PermissionService,
        private _Service: Service,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService
    ) {
        this.formData = this._formBuilder.group({
            tax_vehicle: [''],
            ids: this._formBuilder.array([])
        });
    }

    ngOnInit(): void {
        this._activatedRoute.queryParams.subscribe(params => {
            this.start = params['start'];
        });
        this.loadTable();
    }
    onTabChange(event: MatTabChangeEvent): void {
        this.selectedIndex = event.index;

        switch (this.selectedIndex) {
            case 0:
                this.loadTable();
                break;
            case 1:
                this.loadTable2();
                break;
            case 2:
                this.loadTable3();
                break;
            case 3:
                this.loadTable4();
                break;
            default:
                break;
        }
    }

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
        const status = "check";
        this.dtOptions = {
            pagingType: 'full_numbers', pageLength: 10, displayStart: this.start,
            serverSide: true, processing: true, responsive: true,
            language: { url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json', },
            ajax: (dataTablesParameters: any, callback) => {
                this.currentStart = dataTablesParameters.start;
                dataTablesParameters.tax_vehicle = status;
                this._Service.getPage(dataTablesParameters).subscribe((resp) => {
                    this.dataRow = resp.data; this.pages.current_page = resp.current_page;
                    this.pages.last_page = resp.last_page; this.pages.per_page = resp.per_page;
                    if (resp.current_page > 1) { this.pages.begin = resp.per_page * (resp.current_page - 1); }
                    else { this.pages.begin = 0; }

                    callback({ recordsTotal: resp.total, recordsFiltered: resp.total, data: [], });
                    this._changeDetectorRef.markForCheck();
                });
            },
        };
    }
    pages2 = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable2(): void {
        const status = "wait";
        this.dtOptions2 = {
            pagingType: 'full_numbers', pageLength: 10, displayStart: this.start,
            serverSide: true, processing: true, responsive: true,
            language: { url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json', },
            ajax: (dataTablesParameters: any, callback) => {
                this.currentStart = dataTablesParameters.start;
                dataTablesParameters.tax_vehicle = status;
                this._Service.getPage(dataTablesParameters).subscribe((resp) => {
                    this.dataRow2 = resp.data; this.pages2.current_page = resp.current_page;
                    this.pages2.last_page = resp.last_page; this.pages2.per_page = resp.per_page;
                    if (resp.current_page > 1) { this.pages2.begin = resp.per_page * (resp.current_page - 1); }
                    else { this.pages2.begin = 0; }

                    callback({ recordsTotal: resp.total, recordsFiltered: resp.total, data: [], });
                    this._changeDetectorRef.markForCheck();
                });
            },
        };
    }
    pages3 = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable3(): void {
        const status = "send";
        this.dtOptions3 = {
            pagingType: 'full_numbers', pageLength: 10, displayStart: this.start,
            serverSide: true, processing: true, responsive: true,
            language: { url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json', },
            ajax: (dataTablesParameters: any, callback) => {
                this.currentStart = dataTablesParameters.start;
                dataTablesParameters.tax_vehicle = status;
                this._Service.getPage(dataTablesParameters).subscribe((resp) => {
                    this.dataRow3 = resp.data; this.pages3.current_page = resp.current_page;
                    this.pages3.last_page = resp.last_page; this.pages3.per_page = resp.per_page;
                    if (resp.current_page > 1) { this.pages3.begin = resp.per_page * (resp.current_page - 1); }
                    else { this.pages3.begin = 0; }

                    callback({ recordsTotal: resp.total, recordsFiltered: resp.total, data: [], });
                    this._changeDetectorRef.markForCheck();
                });
            },
        };
    }
    pages4 = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable4(): void {
        const status = "complete";
        this.dtOptions4 = {
            pagingType: 'full_numbers', pageLength: 10, displayStart: this.start,
            serverSide: true, processing: true, responsive: true,
            language: { url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json', },
            ajax: (dataTablesParameters: any, callback) => {
                this.currentStart = dataTablesParameters.start;
                dataTablesParameters.tax_vehicle = status;
                this._Service.getPage(dataTablesParameters).subscribe((resp) => {
                    this.dataRow4 = resp.data; this.pages4.current_page = resp.current_page;
                    this.pages4.last_page = resp.last_page; this.pages4.per_page = resp.per_page;
                    if (resp.current_page > 1) { this.pages4.begin = resp.per_page * (resp.current_page - 1); }
                    else { this.pages4.begin = 0; }

                    callback({ recordsTotal: resp.total, recordsFiltered: resp.total, data: [], });
                    this._changeDetectorRef.markForCheck();
                });
            },
        };
    }

    ngAfterViewInit(): void {
        this.loadTable();
        this.loadTable2();
        this.loadTable3();
        this.loadTable4();
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    openDetail(item: any): void { }
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }
    showEdit() {
        const getpermission = JSON.parse(localStorage.getItem('permission'));
        const menu = getpermission.id == 2;
        return menu;
    }
    showDelete() {
        const getpermission = JSON.parse(localStorage.getItem('permission'));
        const menu = getpermission.id == 2;
        return menu;
    }

    toggleSelectAll(isChecked: boolean): void {
        const idsArray = this.formData.get('ids') as FormArray;
        idsArray.clear();

        if (isChecked) { // เพิ่ม ID ทั้งหมดลงใน ids
            this.dataRow.forEach(item => { idsArray.push(this._formBuilder.control(item.id)); });
        }
    }
    toggleSelect(id: number, isChecked: boolean, event: MouseEvent): void {
        const idsArray = this.formData.get('ids') as FormArray;

        if (isChecked) { // เพิ่ม ID ลงใน FormArray
            idsArray.push(this._formBuilder.control(id));
        } else { // นำ ID ออกจาก FormArray
            const index = idsArray.controls.findIndex(control => control.value === id);
            if (index >= 0) { idsArray.removeAt(index); }
        }
    }
    ChangeStatus(status: string): void {
        this.formData.get('tax_vehicle').patchValue(status);
        this._Service.updateStatus(this.formData.value).subscribe({
            next: () => { this.rerender(); },
            error: (err) => { console.error('Update failed', err); }
        });
    }

    isAllSelected(): boolean {
        const idsArray = this.formData.get('ids') as FormArray;
        return idsArray.length === this.dataRow.length;
    }
    isSomeSelected(): boolean {
        const idsArray = this.formData.get('ids') as FormArray;
        return idsArray.length > 0 && idsArray.length < this.dataRow.length;
    }

    rerender(): void { this.dtElements.forEach((dtElement: DataTableDirective) =>
        { dtElement.dtInstance.then((dtInstance: any) => dtInstance.ajax.reload()); });
    }

}
