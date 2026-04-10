import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
export class IconsModule
{
    /**
     * Constructor
     */
    constructor(
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry
    )
    {
        const bypassUrl = this._domSanitizer.bypassSecurityTrustResourceUrl.bind(this._domSanitizer) as (url: string) => any;

        // Register icon sets
        this._matIconRegistry.addSvgIconSet(bypassUrl('assets/icons/material-twotone.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('mat_outline', bypassUrl('assets/icons/material-outline.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('mat_solid', bypassUrl('assets/icons/material-solid.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('iconsmind', bypassUrl('assets/icons/iconsmind.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('feather', bypassUrl('assets/icons/feather.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', bypassUrl('assets/icons/heroicons-outline.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('heroicons_solid', bypassUrl('assets/icons/heroicons-solid.svg'));

        // Register your new exclusive icon
        this._matIconRegistry.addSvgIcon('excel-icon', bypassUrl('assets/icons/excel-icon.svg'));
        this._matIconRegistry.addSvgIcon('pdf-icon', bypassUrl('assets/icons/pdf-icon.svg'));
        this._matIconRegistry.addSvgIcon('pdf-icon1', bypassUrl('assets/icons/pdf-icon1.svg'));
    }
}
