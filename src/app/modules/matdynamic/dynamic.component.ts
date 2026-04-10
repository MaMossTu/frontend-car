import { ChangeDetectorRef, Component, EventEmitter, Host, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { FormDataService } from 'app/modules/matdynamic/form-data.service'
import { Observable } from 'rxjs';

@Component({
    selector: 'mff',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input matInput min="0"
                [formControl]="formGroup.get(fCN)"
                [placeholder]="pHold"
                [readonly]="readonly"
                [type]="type"
            >
        </mat-form-field>
    `,
    styleUrls: ['./dynamic.component.scss'],
})
export class MffComponent implements OnInit {
    @Input() label: string = '';
    @Input() fCN!: string; // formControlName
    @Input() pHold: string = '';
    @Input() form?: FormGroup; // Allow form to be passed as Input
    @Input() readonly: boolean = false; // Add readonly input
    @Input() type: string = 'text'; // Add type input, default to 'text'

    public formGroup!: FormGroup;

    constructor(
        @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
    ) {}

    ngOnInit(): void {
        // If form input is provided, use it; otherwise, use form from ControlContainer
        this.formGroup = this.form || (this.controlContainer?.control as FormGroup);
    }
}

@Component({
    selector: 'mffa',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input matInput [formControl]="fCN" [placeholder]="pHold">
        </mat-form-field>
    `,
    styleUrls: ['./dynamic.component.scss'],
})
export class MffaComponent implements OnInit {
    @Input() label!: string;
    @Input() fCN!: string;
    @Input() pHold!: string;
    @Input() form: string = 'formData'; // Default value

    public formControl!: FormControl; // Will be assigned from the formGroup

    constructor(
        private _formDataService: FormDataService,
        private cdr: ChangeDetectorRef
    ) {

    }

    ngOnInit(): void {
        // Get the form group from the service
        const formGroup = this._formDataService.getFormGroup(this.form);
        // Retrieve the form control using the formControlName
        this.formControl = formGroup?.get(this.fCN) as FormControl;
        this.cdr.detectChanges();
    }
}

@Component({
    selector: 'mffv',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input matInput [value]="value"
            (input)="onValueChange($event.target.value)" [placeholder]="pHold">
        </mat-form-field>
    `,
    styleUrls: ['./dynamic.component.scss'],
})
export class MffvComponent {
    @Input() label!: string;
    @Input() value!: string | number;
    @Input() pHold!: string;

    @Output() valueChange = new EventEmitter<string | number>();

    onValueChange(newValue: string): void {
        this.valueChange.emit(newValue);
    }
}

@Component({
    selector: 'mfs',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input matInput [formControl]="formControl" [matAutocomplete]="auto" />
            <mat-autocomplete #auto="matAutocomplete">
                <mat-option *ngFor="let item of sift | async" [value]="item[KEY]">
                    {{ item[KEY] }}
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>
    `,
    styleUrls: ['./dynamic.component.scss']
})
export class MfsComponent implements OnInit {
    @Input() label!: string;
    @Input() fCN!: string;
    @Input() KEY!: string;
    @Input() KEYid: string = 'id';
    @Input() sift!: Observable<any[]>;

    public formControl!: FormControl;

    constructor(
        @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
    ) {}

    ngOnInit(): void {
        // ถ้า controlContainer มีค่า แสดงว่ามี FormGroup จาก Host Component
        const formGroup = this.controlContainer?.control as FormGroup;

        // ตรวจสอบว่ามี formGroup และฟอร์มคอนโทรลที่กำหนดไว้หรือไม่
        if (formGroup && this.fCN) {
            this.formControl = formGroup.get(this.fCN) as FormControl;
        }
    }
}
