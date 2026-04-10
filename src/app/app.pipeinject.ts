// pipes.module.ts
import { NgModule } from '@angular/core';
import { ThDatePipe } from './app.declaration';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ThDatePipe,
    ],
    exports: [
        ThDatePipe,
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule {}
