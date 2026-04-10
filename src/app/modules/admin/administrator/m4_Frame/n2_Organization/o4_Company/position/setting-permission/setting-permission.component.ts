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
    ChangeDetectionStrategy,
    HostListener,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
    lastValueFrom,
    map,
    Observable,
    of,
    startWith,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Service } from '../page.service';
import { DataTableDirective } from 'angular-datatables';
import {
    UtilityService,
    DATE_TH_FORMATS,
    CustomDateAdapter,
} from 'app/app.utility-service';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
@Component({
    selector: 'app-setting-permission',
    templateUrl: './setting-permission.component.html',
    styleUrls: ['./setting-permission.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: DATE_TH_FORMATS },
        { provide: LOCALE_ID, useValue: 'th-TH-u-ca-gregory' },
        { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    ],
    animations: fuseAnimations,
})
export class SettingPermissionComponent implements OnInit {
    data: any;
    formData: FormGroup;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirm: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: Service,
        private _matDialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
        // private _formDataFrame: FormDataFrame,
        private _US: UtilityService,
        private _router: Router,
        private activated: ActivatedRoute
    ) {
        this.data = this.activated.snapshot.data?.data?.data;

        this.formData = this._formBuilder.group({
            menu: this._formBuilder.array([]),
        });

        // Populate menu array with data from menu_permissions
        if (this.data?.menu_permissions) {
            this.data.menu_permissions.forEach((permission) => {
                this.menuArray.push(this.createmenu(permission));
            });
        }
    }

    ngOnInit(): void {}

    get menuArray(): FormArray {
        return this.formData.get('menu') as FormArray;
    }
    createmenu(data?: any): FormGroup {
        return this._formBuilder.group({
            id: [data?.id || ''],
            role_id: [data?.role_id || ''],
            menu_name: [data?.menu?.name || ''],
            menu_id: [data?.menu_id || ''],
            view: [data?.view || ''],
            save: [data?.save || ''],
            edit: [data?.edit || ''],
            delete: [data?.delete || ''],
        });
    }
    removetrack(index: number): void {
        this.menuArray.removeAt(index);
    }

    backTo() {
        this._router.navigate(['customer_data/list']);
    }

    Submit(): void {
        const confirmation = this._fuseConfirm.open({
            title: 'บันทึกข้อมูล',
            message: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ยืนยัน',
                    color: 'sky',
                },
                cancel: {
                    show: true,
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                // Loop through menu array and call updateMenusPermission API
                this.menuArray.controls.forEach((menu) => {
                    const menuData = menu.value;
                    menuData.view = menuData.view ? 1 : 0;
                    menuData.save = menuData.save ? 1 : 0;
                    menuData.edit = menuData.edit ? 1 : 0;
                    menuData.delete = menuData.delete ? 1 : 0;
                    this._Service
                        .updateMenusPermission(menuData, menuData.id)
                        .subscribe(
                            (response) => {
                                console.log(
                                    'Menu updated successfully',
                                    response
                                );
                            },
                            (error) => {
                                console.error('Error updating menu', error);
                            }
                        );
                });
            }
        });
    }
}
