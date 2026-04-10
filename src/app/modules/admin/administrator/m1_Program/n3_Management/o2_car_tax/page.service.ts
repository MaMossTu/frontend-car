import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { DataTablesResponse } from 'app/shared/datatable.types';
import { BaseService } from 'app/app.service';
import { environment } from 'environments/environment';

const token = localStorage.getItem('accessToken') || null;
@Injectable({ providedIn: 'root' })
export class Service extends BaseService {

    constructor(_httpClient: HttpClient) {
        super(_httpClient);
    }

    httpOptionsFormdata = { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }), };

    // CRUD operations
    create(data: any): Observable<any> { return this.post('/api/vehicle/brands/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/vehicle/brands/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/vehicle/brands/delete/${id}`, this.httpOptions); }
    // getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
    //     return this._httpClient.post<any>(`${environment.API_URL}/api/vehicle/brands/getPage`, dataTablesParameters, this.httpOptions)
    //         .pipe(map(response => response.data as DataTablesResponse));
    // }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(environment.API_URL + '/api/Getpage/Car_tax',
                dataTablesParameters, this.httpOptionsFormdata)
            .pipe(switchMap((response: any) => { return of(response.data); }));
    }

    updateStatusID(data: any, id: string): Observable<any> { return this.put(`/api/update/status/inspecions/tax/${id}`, data); }
    updateStatus(data: any): Observable<any> { return this.put('/api/update/status/inspecions/tax', data); }
    updateTypeDocument(data: any, id: string): Observable<any> {
        return this.put(`/api/update/status/inspecions/type_document/${id}`, data);
    }
    updatePayTrue(data: any, id: string): Observable<any> {
        return this.put(`/api/update/status/inspecions/paytrue/${id}`, data);
    }

    updateVehicleTaxRenewalDate(vehicleId: number, data: any): Observable<any> {
        return this.post(`/api/vehicle/update_tax_renewal_date/${vehicleId}`, data);
    }
}
