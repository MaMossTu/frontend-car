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
    create(data: any): Observable<any> { return this.post('/api/doc_transactions/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/doc_transactions/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/doc_transactions/delete/${id}`, this.httpOptions); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/doc_transactions/getPage`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }

    getDocCustomerData(): Observable<any> {
        return this.get('/api/doc_customer/show'); }
    getInspection(): Observable<any> {
        return this.get('/api/inspections/show'); }
}
