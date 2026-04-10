import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styles: [
        /* language=SCSS */
        `
            @screen md {
                .max-w-6xl {
                    width: 50% !important;
                }

                .light {
                    background: #2a2e45 !important;
                }
            }

            @screen lg {
                .max-w-6xl {
                    width: 50% !important;
                }

                .light {
                    background: #2a2e45 !important;
                }
            }

            .fuse-mat-button-large {
                border-radius: 5px !important;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) { return; }
        this.signInForm.disable();
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe({
            complete: () => {
                let redirectURL = "Dashboard/list";
                this._router.navigateByUrl(redirectURL);
            },
            error: (error: HttpErrorResponse) => {
                this.signInForm.enable();
                const rawMessage =
                    error?.error?.error?.message ||
                    error?.error?.message ||
                    (typeof error?.error === 'string' ? error.error : '') ||
                    error?.message ||
                    '';

                let errorMsg = '';
                if (error?.status === 401) {
                    errorMsg = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
                } else if (rawMessage === 'Invalid identifier or password') {
                    errorMsg = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
                } else if (rawMessage) {
                    errorMsg = rawMessage;
                } else {
                    errorMsg = 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
                }

                this.alert = {
                    type: 'error',
                    message: errorMsg,
                };
                this.showAlert = true;
            },
        });
    }
}
