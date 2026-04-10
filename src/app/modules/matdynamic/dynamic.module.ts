import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MffComponent, MffaComponent, MfsComponent, MffvComponent, } from './dynamic.component';

@NgModule({
    declarations: [
        MffComponent,
        MffaComponent,
        MfsComponent,
        MffvComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
    ],
    exports: [
        MffComponent,
        MffaComponent,
        MfsComponent,
        MffvComponent,
    ]
})
export class MatDynamicModule { }
