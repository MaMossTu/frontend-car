import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DataTablesResponse } from 'app/shared/datatable.types';
import { BaseService } from 'app/app.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class Service extends BaseService {

    constructor(_httpClient: HttpClient) {
        super(_httpClient);
    }

    // CRUD operations
    create(data: any): Observable<any> { return this.post('/api/vehicle/brands/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/vehicle/brands/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/vehicle/brands/delete/${id}`, this.httpOptions); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/Getpage/daily_report_getpage`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }


    getBranch() {
        return this._httpClient.get(environment.API_URL + '/api/Brache/show');
    }

    getCustomer() {
        return this._httpClient.get(environment.API_URL + '/api/customer/show');
    }

    getDailyReport(data: any) {
        return this._httpClient.get(environment.API_URL + '/api/report/reportdaily', {params :{
            stardate: data.date_start,
            enddate: data.date_end
        }});
    }

    getDailyReport_new(data: any) {
        return this._httpClient.get(environment.API_URL + '/api/report/query_income_byservice', {params :{
            start_date: data.date_start,
            end_date: data.date_end,
            branch_id: data.branch_id,
        }});
    }

    getreport(data: any): Observable<any> { return this.post(`/api/doc_transactions/report_branch`, data); }

}
