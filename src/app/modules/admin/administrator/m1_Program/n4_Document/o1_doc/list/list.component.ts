import {
    LOCALE_ID, Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewChildren,
    QueryList, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, HostListener
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Service } from '../page.service';
import { DataTableDirective } from 'angular-datatables';
import { UtilityService, DATE_TH_FORMATS, CustomDateAdapter } from 'app/app.utility-service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormDataService } from 'app/modules/matdynamic/form-data.service';
import { MatTabChangeEvent } from '@angular/material/tabs';


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
    public dataRow: any[] = [];
    public formData: FormGroup;
    public createResp: any[] = [];
    public updateResp: any[] = [];
    public deleteResp: any[] = [];
    public flashMessage: 'success' | 'error' | null = null;
    public isLoading: boolean = false;
    public currentStart: number = 0;
    public pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    public isEdit: boolean = false;
    public dialogWidth: number = 40; // scale in %

    public listDocType: any = [];
    public listEngineer: any = [];
    public listInsurance: any = [];

    @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;
    @ViewChild(MatPaginator) _paginator: MatPaginator;
    @ViewChild('Dialog') Dialog: TemplateRef<any>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private start: number;
    form: FormGroup
    status: any[] = [
        { value: '', name: 'ทั้งหมด' },
        { value: 'gas', name: 'แก๊ส' },
        { value: 'prb', name: 'พรบ.' },
        { value: 'insu', name: 'ประกัน' },
    ]
    type_doc: string = '';
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
        this.formData = this._formBuilder.group({
            id: '',
            no: '',
            name: '',
            engineer_id: '',
            insurance_names_id: '',
            type_vehicle: '',
            type_gas: '',
            type_job: '',
            type_doc: '',
        });
        this._formDataService.setFormGroup('formData', this.formData);
        this.form = this._formBuilder.group({
            status: '',
            name: '',
        })
    }

    // Lifecycle Hooks
    async ngOnInit(): Promise<void> {
        this._activatedRoute.queryParams.subscribe(params => this.start = params['start']);
        this.loadTable();

        this._Service.getDocType().subscribe((resp) => { this.listDocType = resp.data; });
        this._Service.getEngineer().subscribe((resp) => { this.listEngineer = resp.data; });
        this._Service.getInsurance().subscribe((resp) => { this.listInsurance = resp.data; });
    }
    ngAfterViewInit(): void { }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // DataTable Initialization
    // loadTable(): void { this._US.loadTable(this, this._Service, this._changeDetectorRef, this.pages, this, this.start, this); }
    loadTable(): void {
        this.dtOptions = {
            pagingType: 'full_numbers', pageLength: 10, displayStart: this.currentStart || this.start,
            serverSide: true, processing: true, responsive: true, order: [[0, 'desc']],
            language: { url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json', },
            ajax: (dataTablesParameters: any, callback) => {
                this.currentStart = dataTablesParameters.start;
                dataTablesParameters.type = this.form.value.status;
                const order = dataTablesParameters.order.length > 0
                    ? dataTablesParameters.order[0]
                    : { column: 0, dir: 'desc' };
                this._Service.getPage({ ...dataTablesParameters, order: [order] }).subscribe((resp) => {
                    this.dataRow = resp.data;
                    this.pages.current_page = resp.current_page;
                    this.pages.last_page = resp.last_page;
                    this.pages.per_page = resp.per_page;

                    if (resp.current_page > 1) {
                        this.pages.begin = resp.per_page * (resp.current_page - 1);
                    } else { this.pages.begin = 0; }

                    callback({ recordsTotal: resp.total, recordsFiltered: resp.total, data: [] });
                    this._changeDetectorRef.markForCheck();
                });
            },
        };
    }

    // CRUD Operations
    create(): void { this._US.createItem(this._Service, this._fuseConfirm, this.submitForm.bind(this), this.createResp); }
    update(): void { this._US.updateItem(this.formData, this._Service, this._fuseConfirm, this.submitForm.bind(this), this.updateResp); }
    delete(id: any): void { this._US.deleteItem(id, this._Service, this._fuseConfirm, this.rerender.bind(this), this.deleteResp); }

    // Dialog Operations
    openDialog(item?: any, event?: Event): void {
        this.formData.patchValue({
            type_doc: this.type_doc,
        });
        if (event) {
            event.stopPropagation();
        }
        if (item) {
            // Create a new object with null values replaced by empty strings
            const cleanedItem = Object.fromEntries(
                Object.entries(item).map(([key, value]) => [key, value === null ? '' : value])
            );
            this.formData.patchValue(cleanedItem);
            this.isEdit = true;
        } else {
            this.isEdit = false;
        }
        this._US.openDialog(this._matDialog, this.Dialog, this.dialogWidth, this.formData);
    }
    closeDialog(Ref?: any): void { (Ref) ? (this._US.closeDialog(Ref)) : (this._matDialog.closeAll()) }

    // Utility Methods
    // rerender(): void {
    //     this.dtElements.forEach((dtElement: DataTableDirective) =>{
    //         dtElement.dtInstance.then((dtInstance: any) => dtInstance.ajax.reload());
    //     });
    // }
    rerender(): void {
        this.dtElements.forEach((dtElement: DataTableDirective) => {
            dtElement.dtInstance.then((dtInstance: any) => {
                // Store current page info before reload
                const currentPage = dtInstance.page.info().page;

                // Reload the table
                dtInstance.ajax.reload(() => {
                    // After reload, go back to the stored page
                    dtInstance.page(currentPage).draw('page');
                }, false); // false means don't reset pagination
            });
        });
    }
    showEdit(): boolean { return this._US.hasPermission(1); }
    showDelete(): boolean { return this._US.hasPermission(1); }
    showFlashMessage(type: 'success' | 'error'): void { this._US.showFlashMessage(type, this._changeDetectorRef, this); }

    private submitForm(action: (formData: FormData) => Observable<any>): void {
        this._US.submitForm(
            this.formData, action, this._changeDetectorRef, this._fuseConfirm, this, this.rerender.bind(this), this.closeDialog.bind(this)
        );
    }

    // onChangeType(event: MatTabChangeEvent)
    // {
    //     const index = event.index;
    //     this.form.patchValue({
    //         status: this.status[index].value,
    //         name: this.status[index].name
    //     });
    //     this.type_doc = this.status[index].value;
    //     this.formData.patchValue({
    //         type_doc: this.status[index].value,
    //     });

    //     this.rerender();
    //     this._changeDetectorRef.markForCheck();
    // }
    onChangeType(event: MatTabChangeEvent) {
        const index = event.index;
        this.form.patchValue({
            status: this.status[index].value,
            name: this.status[index].name
        });
        this.type_doc = this.status[index].value;
        this.formData.patchValue({
            type_doc: this.status[index].value,
        });

        // Store current pagination state before rerender
        let currentStart = this.currentStart;
        // this.dtElements.forEach((dtElement: DataTableDirective) => {
        //     if (dtElement.dtInstance) {
        //       dtElement.dtInstance.then((dtInstance: any) => {
        //         // Destroy the table completely
        //         dtInstance.destroy();

        //         // Reinitialize the table with new settings
        //         this.loadTable();

        //         // Mark for check to ensure Angular detects changes
        //         this._changeDetectorRef.detectChanges();
        //       });
        //     }
        //   });
        this.rerender();

        // Make sure DataTables options maintain this start position
        this.dtOptions = {
            ...this.dtOptions,
            displayStart: currentStart
        };

        this._changeDetectorRef.markForCheck();
    }
}
