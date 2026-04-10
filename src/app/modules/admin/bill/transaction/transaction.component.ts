import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
// import { ToastrService } from 'ngx-toastr';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DateTime } from 'luxon';
import { StockService } from '../page.service';
@Component({
    selector: 'app-page-transaction',
    providers: [
        CurrencyPipe,
        DecimalPipe
    ],
    templateUrl: './transaction.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class TransactionComponent implements OnInit, AfterViewInit {
    dtOptions: any = {};
    dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
    @ViewChild('btNg') btNg: any;
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    form: FormGroup
    @Input() storeId: any;
    @Output() dataArrayChange = new EventEmitter<any[]>();
    itemType: any[] = [];
    type: string = '';
    data: any;
    Id: any;

    @ViewChild('textStatus') textStatus: any;
    constructor(
        private _service: StockService,
        private fuseConfirmationService: FuseConfirmationService,
        public dialog: MatDialog,
        private _router: Router,
        private _activated: ActivatedRoute,
        private currencyPipe: CurrencyPipe,
        private _fb: FormBuilder

    ) {
        this.type = this._activated.snapshot.data.status
        this.Id = this._activated.snapshot.params.id

        this.form = this._fb.group({
            customer_id: null,
            status: 'Approved',
            date: null,
            del_date: null,
            item_id: null
        })

    }
    ngOnInit(): void {
        setTimeout(() =>
            this.loadTable());
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.dtTrigger.next(this.dtOptions);
        }, 200);
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    checkStatus(data: string) {

        let status: string = data;
        let statusText: string = '';

        if (status === 'Deposit') {
            statusText = 'รับเข้า';
        } else if (status === 'Withdraw') {
            statusText = 'เบิกออก';
        } else if (status === 'Adjust') {
            statusText = 'ปรับปรุง';
        }else if (status === 'Movement') {
            statusText = 'ย้าย';
        }else if (status === 'Transaction') {
            statusText = 'ความเคลื่อนไหว';
        }else {
            statusText = 'ไม่ทราบสถานะ';
        }
        return statusText
    }

    checkStatusList(data: string) {
        let status: string = data;
        let statusText: string = '';

        if (status === 'Approved') {
            statusText = 'อนุมัติ';
        } else if (status === 'Open') {
            statusText = 'รออนุมัติ';
        }else {
            statusText = 'ไม่ทราบสถานะ';
        }
        return statusText
    }

    loadTable(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            serverSide: true,
            order: [0, 'desc'],     // Set the flag
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.report_stock_id = this.Id;

                this._service.getTransaction(dataTablesParameters).subscribe({

                    next: (resp: any) => {

                        callback({
                            recordsTotal: resp.total,
                            recordsFiltered: resp.total,
                            data: resp.data
                        });
                    }, error: () => {
                    }
                })
            },
            columns: [
                {
                    title: 'ลำดับ',
                    data: 'No',
                    className: 'w-15 text-center'
                },
                {
                    title: 'วันที่สร้าง',
                    data: function(row: any) {
                        if (row.created_at) {
                            // ใช้ fromSQL หรือจากรูปแบบ string ที่ตรงกับ row.created_at
                            return DateTime.fromFormat(row.created_at, "yyyy-MM-dd HH:mm:ss").toFormat("dd/MM/yyyy HH:mm");
                        } else {
                            return '-';
                        }
                    },
                    defaultContent: '',
                    className: 'text-center'
                },

                {
                    title: 'เลขที่ทำรายการ',
                    data: 'report_stock.report_id',
                    defaultContent: '-',
                    className: 'text-left'
                },
                {
                    title: 'วันที่เอกสาร',
                    // data: 'created_at',
                    data: function(row: any) {
                        if (row.date)
                            return DateTime.fromISO(row.date).toFormat('dd/MM/yyyy');
                        else
                            return '-'
                    },
                    defaultContent: '',
                    className: 'text-center'
                },
                {
                    title: 'รหัสสินค้า',
                    data: 'item.item_id',
                    defaultContent: '-',
                    className: 'text-left'
                },
                {
                    title: 'ชื่อสินค้า',
                    data: 'item.name',
                    defaultContent: '-',
                    className: 'text-left'
                },
                {
                    title: 'หมวดหมู่',
                    data: 'item.item_type.name',
                    defaultContent: '-',
                    className: 'text-left'
                },
                {
                    title: 'จำนวน',
                    data: 'qty',
                    defaultContent: '-',
                    className: 'text-left'
                },
                {
                    title: 'หน่วย',
                    data: 'item.unit_store.name',
                    defaultContent: '-',
                    className: 'text-left'
                },
                {
                    title: 'คงเหลือ',
                    data: 'balance',
                    defaultContent: '-',
                    className: 'text-left'
                },
                {
                    title: 'สถานที่',
                    data: 'location_1.name',
                    defaultContent: '-',
                    className: 'text-center w-20',

                },
            ]
        }
    }

    rerender(): void {
        this.dtElement.dtInstance.then(dtInstance => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(null);
        });
    }

    opendialogAdd() {
        if(this.type === 'Deposit') {
            this._router.navigate(['stock/deposit/form'])
        }

    }

    openDialogEdit(id: any) {
        this._router.navigate(['sale-order/edit/' + id])
    }


    clickDelete(id: any) {
        const type = this.type;
        const confirmation = this.fuseConfirmationService.open({
            title: "ยืนยันลบข้อมูล",
            message: "กรุณาตรวจสอบข้อมูล หากลบข้อมูลแล้วจะไม่สามารถนำกลับมาได้",
            icon: {
                show: true,
                name: "heroicons_outline:exclamation-triangle",
                color: "warn"
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
                    this._service.delete(id,type).subscribe({
                        error: (err) => {

                        },
                        complete: () => {
                            this.rerender();
                        },
                    });
                }
            }
        )
    }
    onChangeType() {
        this.rerender()
    }
}
