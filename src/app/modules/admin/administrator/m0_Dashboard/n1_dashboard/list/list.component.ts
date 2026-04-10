import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, LOCALE_ID,
    OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { fuseAnimations } from '@fuse/animations';
import { Service } from '../page.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UtilityService, DATE_TH_FORMATS, CustomDateAdapter } from 'app/app.utility-service';

import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle,
    ApexStroke, ApexGrid, ApexYAxis, ApexFill, ApexMarkers, ApexPlotOptions, ApexLegend, } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; yaxis: ApexYAxis; dataLabels: ApexDataLabels;
    grid: ApexGrid; stroke: ApexStroke; title: ApexTitleSubtitle; fill: ApexFill; markers: ApexMarkers;
    colors: string[]; plotOptions: ApexPlotOptions; tooltip: any; legend: ApexLegend;
};

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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {

    public dtOptions: DataTables.Settings = {};
    public dataRow: any[];

    @ViewChild(MatPaginator) _paginator: MatPaginator;
    @ViewChild("chart") chart: ChartComponent;

    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;

    public chartOptions1: Partial<ChartOptions>;
    public chartOptions2: Partial<ChartOptions>;
    public chartOptions3: Partial<ChartOptions>;

    public dashboardDay: any;
    public dashboardMonth: any;
    public dashboardYear: any;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _Service: Service,
        private _US: UtilityService,
    ) {
        this.chartOptions1 = {
            series: [
                {
                    name:                   "XYZ MOTORS",
                    data:                   [0],
                }
            ],
            chart: {
                type:                       "area",
                stacked:                    false,
                height:                     350,
                zoom: {
                    type:                   "x",
                    enabled:                true,
                    autoScaleYaxis:         true
                },
                toolbar:                    { autoSelected: "zoom" }
            },
            dataLabels:                     { enabled: false },
            markers:                        { size: 0 },
            title: {
                text:                       "ยอดผู้ใช้งานเดือน " + this.getMonthNameInThai(String(new Date())),
                align:                      "left",
                style: {
                    fontFamily:             'Prompt'
                },
            },
            fill: {
                type:                       "gradient",
                gradient: {
                    shadeIntensity:         1,
                    inverseColors:          false,
                    opacityFrom:            0.5,
                    opacityTo:              0,
                    stops:                  [0, 90, 100]
                }
            },
            yaxis: {
                title: {
                    style: {
                        fontFamily:         'Prompt'
                    },
                }
            },
            xaxis: {
                type:                       "datetime",
                tickAmount:                 this.getDaysInMonth(),
                labels: {
                    formatter: function (value) {
                        return new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                    },
                    style: {
                        fontFamily:         'Prompt'
                    },
                }
            },
            tooltip: {
                shared:                     false,
            }
        };

        this.chartOptions3 = {
            series: [
                {
                    name:                   "Inflation",
                    data:                   [0]
                }
            ],
            chart:                          { height: 350, type: "bar" },
            plotOptions: {
                bar: {
                    dataLabels:             { position: "top" }
                }
            }, // top, center, bottom
            dataLabels: {
                enabled:                    true,
                offsetY:                    -20,
                style: {
                    fontSize:               "12px",
                    colors:                 ["#304758"]
                }
            },
            // fill: {
            //     type:                       "gradient",
            //     gradient: {
            //         shade:                  "light",
            //         type:                   "horizontal",
            //         shadeIntensity:         0.25,
            //         gradientToColors:       undefined,
            //         inverseColors:          true,
            //         opacityFrom:            1,
            //         opacityTo:              1,
            //         stops:                  [50, 0, 100, 100]
            //     }
            // },
            yaxis: {
                axisBorder:                 { show: false, },
                axisTicks:                  { show: false, },
                labels:                     { show: false, },
            },
            xaxis: {
                categories:                 [],
                position:                   "top",
                labels:                     { offsetY: -18 },
                axisBorder:                 { show: false },
                axisTicks:                  { show: false },
                crosshairs: {
                    fill: {
                        type:               "gradient",
                        gradient: {
                            colorFrom:      "#D8E3F0",
                            colorTo:        "#BED1E6",
                            stops:          [0, 100],
                            opacityFrom:    0.4,
                            opacityTo:      0.5
                        }
                    }
                },
                tooltip: {
                    enabled:                true,
                    offsetY:                -35
                }
            },
            title: {
                text: "จำนวนผู้ใช้งานปี " + this.getYearInThai(),
                floating:                   false,
                offsetY:                    330,
                align:                      "center",
                style: {
                    fontFamily:             'Prompt'
                },
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------


    formData: FormGroup = this._formBuilder.group({
        day: new Date().toISOString().split('T')[0],
        // day: '2024-09-30',
    });

    start: number;
    async ngOnInit(): Promise<void> {
        this.loadDataAndUpdateChart();
    }

    async loadDataAndUpdateChart(): Promise<void> {
        this.isLoading = true;

        this._Service.updateStatus(this.formData.value).subscribe({
            next: (resp) => {
                this.dashboardDay = resp.data.Day;
                this.dashboardMonth = resp.data.Month;
                this.dashboardYear = resp.data.Year;

                const inspectionsPerDay = resp.data?.Month?.inspections_per_day;
                const inspectionsPerMonth = resp.data?.Year?.inspections_per_month;

                if (inspectionsPerDay && Array.isArray(inspectionsPerDay)) {
                    const currentDate = this.formData.value.day;
                    const year = new Date(currentDate).getFullYear();
                    const month = new Date(currentDate).getMonth();
                    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

                    const dateArray = Array.from({ length: lastDayOfMonth }, (_, index) => {
                        return new Date(year, month, index + 1).getTime();
                    });

                    this.chartOptions1.series = [{
                        name: "Activity",
                        data: inspectionsPerDay.map((value, index) => ({
                            x: dateArray[index],
                            y: value
                        }))
                    }];
                    this.chartOptions1.xaxis = {
                        type:                       "datetime",
                        tickAmount: this.getDaysInMonth(),
                        labels: {
                            formatter: function (value) {
                                return new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                            }
                        }
                    };
                    this.chartOptions1.title = {
                        text: "ยอดผู้ใช้งานเดือน" + this.getMonthNameInThai(currentDate),
                        align: "left",
                        style: {
                            fontFamily: 'Prompt'
                        },
                    }

                    this.chartOptions3.series = [{
                        name: "Activity",
                        data: inspectionsPerMonth.map((value, index) => ({
                            x: this.getMonthName(index),
                            y: value
                        }))
                    }];
                    this.chartOptions3.title = {
                        text:                       "จำนวนผู้ใช้งานปี " + this.getYearInThai(),
                        floating:                   false,
                        offsetY:                    330,
                        align:                      "center",
                        style: {
                            fontFamily:             'Prompt'
                        },
                    }

                    if (this.chart) {
                        this.chart.updateOptions(this.chartOptions1);
                        this.chart.updateOptions(this.chartOptions3);
                    }
                } else {
                    console.error('inspections_per_day is undefined or not an array');
                }

                this.isLoading = false;
                this._changeDetectorRef.markForCheck();
            },
            error: (err) => {
                console.error('Error updating status:', err);
                this.isLoading = false;
                this.showFlashMessage('error');
            }
        });
    }

    private getDaysInMonth(): number {
        const dateString = this.formData.get('day')?.value;
        if (!dateString) { throw new Error("Invalid date format"); }

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth();

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return daysInMonth - 1;
    }
    private getMonthName(index: number): string {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[index];
    }
    private getMonthNameInThai(dateString: string): string {
        const monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
            "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
            "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        const date = new Date(dateString);
        const monthIndex = date.getMonth();

        return monthNames[monthIndex];
    }
    private getYearInThai(): string {
        const year = new Date(this.formData.value.day).getFullYear();
        return String(year > 2400 ? year : year + 543);
    }

    /* Date format (moment to json) */
    onDateChange(event: any, controlName: string, formName: FormGroup): void {
        this._US.onDateChange(event, controlName, formName);
        this.loadDataAndUpdateChart();
    }
    onDateInput(event: any): void { this._US.onDateInput(event); }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show flash message and mark for check
        setTimeout(() => {
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }
}
