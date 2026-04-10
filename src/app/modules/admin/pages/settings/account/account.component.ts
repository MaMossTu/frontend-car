import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { userService } from 'app/modules/admin/marketing/user/user.service';
// import { AssetType, UserDetail, UserList } from 'app/modules/admin/marketing/user/user.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseValidators } from '@fuse/validators';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewTypeDialogComponent } from './view-type-dialog/view-type-dialog.component';
import { groupBy } from 'lodash-es';
@Component({
    selector: 'settings-account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    styles: [
        /* language=SCSS */
        `
        /* .mat-dialog-container,
        .mat-flat-button {
            border-radius: 5px !important;
        } */
        .mat-tab-group .mat-tab-header .mat-tab-label-container .mat-tab-list .mat-tab-labels .mat-tab-label.mat-tab-label-active {
            background-color: #ffffff !important;
            border-top: 2px solid red !important;
            color: red !important
        }
        .mat-tab-group .mat-tab-header .mat-tab-label-container .mat-tab-list .mat-tab-labels .mat-tab-label {
            background-color: #ccc !important;
            border-radius: 0px !important;
        }
        .btn-none-bg {
            border-radius: 5px !important;
            background: #ffffff !important;
            border: 2px solid #F43F5E !important;
            color: #F43F5E !important;
        }
        /* :host::ng-deep .mat-form-field-flex{
            border-width:1px !important;
        } */
        `

    ],
})
export class SettingsAccountComponent implements OnInit {
    accountForm: FormGroup;
    passwordForm: FormGroup;
    // user: UserList;
    // assetTypes: AssetType[] = [];
    userInfos: FormGroup;
    transport_alls: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        // private _userService: userService,
        private _authService: AuthService,
        private _fuseConfirm: FuseConfirmationService,
        private _matDialog: MatDialog,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.userInfos = this._formBuilder.group({
        //     data: this._formBuilder.array([]),
        // });

        // // Create the form
        // this.accountForm = this._formBuilder.group({
        //     username: [{ value: '', disabled: true }],
        //     firstname: [''],
        //     lastname: [''],
        //     email: [{ value: '', disabled: true }],
        //     role: [{ value: '', disabled: true }],
        // });

        // this.passwordForm = this._formBuilder.group({
        //     password: ['', [Validators.required]],
        //     confrim_password: ['', [Validators.required]],
        // }, {
        //     validators: FuseValidators.mustMatch('password', 'confrim_password')
        // });

        // this._userService.asset_types$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((res: any) => {
        //         this.assetTypes = res.data;

        //         for (const assetType of this.assetTypes) {
        //             this.userInfoData.push(this._formBuilder.group({
        //                 id: assetType.id,
        //                 translation: false,
        //                 artwork: false,
        //                 artwork_price: 0,
        //                 printing_costs: this._formBuilder.array([]),
        //             }));
        //         }
        //     }
        //     );

        // //Get me
        // this._userService.getUser().subscribe(
        //     (res: any) => {
        //         this.user = res;

        //         this.transport_alls = Object.entries(groupBy(res.transportation_costs, 'zone'));

        //         this.accountForm.patchValue({
        //             username: this.user.username,
        //             firstname: this.user.firstname,
        //             lastname: this.user.lastname,
        //             email: this.user.email,
        //             role: this.user?.role?.name,
        //         });

        //         const data = this.userInfos.get('data');
        //         for (const userInfo of res['user_infos']) {
        //             if (userInfo.printing_costs.length > 0) {
        //                 // console.log(userInfo);
        //             }

        //             data['controls'].forEach((e: any) => {
        //                 if (e.value.id == userInfo.asset_type.id) {
        //                     const printingCosts = e.get('printing_costs') as FormArray;

        //                     userInfo.printing_costs.forEach((u: any) => {
        //                         printingCosts.push(this._formBuilder.group({
        //                             id: u.id,
        //                             price: u.price,
        //                             asset_size: u.asset_size,
        //                         }));
        //                     });

        //                     e.patchValue({
        //                         artwork: userInfo.artwork,
        //                         artwork_price: userInfo.artwork_price,
        //                         translation: userInfo.translation,
        //                         printing_costs: userInfo.printing_costs,
        //                     })
        //                 }
        //             });
        //         }
        //     }
        // );
        // this.userInfos.disable();
    }

    get userInfoData() {
        return this.userInfos.get('data') as FormArray;
    }

    updateUser(): void {
        // let data = {
        //     firstname: this.accountForm.value.firstname,
        //     lastname: this.accountForm.value.lastname,
        //     user_infos: [],
        // } as UserDetail;

        // this._fuseConfirm.open({
        //     "title": "Confirm !",
        //     "message": "Confirm update user detail",
        //     "icon": {
        //         "show": false,
        //         "name": "heroicons_outline:check-circle",
        //         "color": "success"
        //     },
        //     "actions": {
        //         "confirm": {
        //             "show": true,
        //             "label": "Confirm",
        //             "color": "accent"
        //         },
        //         "cancel": {
        //             "show": true,
        //             "label": "Cancel"
        //         }
        //     },
        //     "dismissible": true
        // }).afterClosed().subscribe(
        //     (result) => {
        //         if (result === 'confirmed') {
        //             this._userService.updateUser(this.user.id, data).subscribe({
        //                 complete: () => {
        //                     const confirmation = this._fuseConfirm.open({
        //                         "title": "Success!",
        //                         "message": "Success!",
        //                         "icon": {
        //                             "show": false,
        //                             "name": "heroicons_outline:check-circle",
        //                             "color": "success"
        //                         },
        //                         "actions": {
        //                             "confirm": {
        //                                 "show": true,
        //                                 "label": "OK",
        //                                 "color": "accent"
        //                             },
        //                             "cancel": {
        //                                 "show": false,
        //                                 "label": "Cancel"
        //                             }
        //                         },
        //                         "dismissible": true
        //                     });

        //                     confirmation.afterClosed().subscribe((result) => {
        //                         window.location.reload();
        //                     });
        //                 },
        //                 error: (err) => {

        //                 }
        //             });
        //         }
        //     }
        // );


    }

    changePassword(): void {
        if (this.passwordForm.invalid) {
            return;
        }

        // this._fuseConfirm.open({
        //     "title": "Confirm change your password !",
        //     "message": "Confirm change your password",
        //     "icon": {
        //         "show": false,
        //         "name": "heroicons_outline:check-circle",
        //         "color": "success"
        //     },
        //     "actions": {
        //         "confirm": {
        //             "show": true,
        //             "label": "Confirm",
        //             "color": "accent"
        //         },
        //         "cancel": {
        //             "show": true,
        //             "label": "Cancel"
        //         }
        //     },
        //     "dismissible": true
        // }).afterClosed().subscribe((result) => {
        //     if (result === 'confirmed') {
        //         this._authService.resetPassword(this.user.id, this.passwordForm.value).subscribe({
        //             complete: () => {
        //                 const confirmation = this._fuseConfirm.open({
        //                     "title": "Success!",
        //                     "message": "Success!",
        //                     "icon": {
        //                         "show": false,
        //                         "name": "heroicons_outline:check-circle",
        //                         "color": "success"
        //                     },
        //                     "actions": {
        //                         "confirm": {
        //                             "show": true,
        //                             "label": "OK",
        //                             "color": "accent"
        //                         },
        //                         "cancel": {
        //                             "show": false,
        //                             "label": "Cancel"
        //                         }
        //                     },
        //                     "dismissible": true
        //                 });

        //                 confirmation.afterClosed().subscribe((result) => {
        //                     window.location.reload();
        //                 });
        //             },
        //             error: (err) => {

        //             }
        //         });
        //     }
        // });
    }

    openDialog(event: any, i: number, item: any) {
        const dialogRef = this._matDialog.open(ViewTypeDialogComponent, {
            disableClose: false,
            autoFocus: false,
            // data: {
            //     initial: item.asset_sizes,
            //     datas: this.userInfos.get('data')['controls'][i],
            // },
        });
    }
}
