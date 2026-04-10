import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataTablesModule } from 'angular-datatables';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { PipesModule } from 'app/app.pipeinject';
import { SharedModule } from 'app/shared/shared.module';
import { MatDynamicModule } from 'app/modules/matdynamic/dynamic.module';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { DocumentComponent } from './page.component';
import { documentRoute } from './page.routes';
import { TransactionComponent } from './transaction/transaction.component';
import { FormComponent } from './form/form.component';
import { DocumentPageComponent } from './document-page.component';
import { DialogStatus } from './dialog-status/dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormInvoiceComponent } from './form-invoice/form.component';
import { DialogPayment } from './dialog-payment/dialog.component';
import { FormBillingComponent } from './form-billing/form.component';
import { DialogRunno } from './dialog-runno/dialog.component';
import { DialogInvoice } from './dialog-invoice/dialog.component';
import { DialogWorkOrder } from './dialog-work-order/dialog.component';

@NgModule({
    declarations: [
        DocumentComponent,
        TransactionComponent,
        FormComponent,
        DocumentPageComponent,
        DialogStatus,
        DialogRunno,
        FormInvoiceComponent,
        DialogPayment,
        FormBillingComponent,
        DialogInvoice,
        DialogWorkOrder,
    ],
    imports: [
        CommonModule,
        DataTablesModule,
        DragDropModule,
        FuseFindByKeyPipeModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        NgImageSliderModule,
        NgxDropzoneModule,
        NgxMatTimepickerModule.setLocale('th-TH'),
        RouterModule.forChild(documentRoute),
        SharedModule,
        MatDynamicModule,
        PipesModule,
        PdfViewerModule
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this
})
export class Module {}
