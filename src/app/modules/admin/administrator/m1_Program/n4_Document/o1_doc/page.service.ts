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
    create(data: any): Observable<any> { return this.post('/api/docs/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/docs/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/docs/delete/${id}`, this.httpOptions); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/docs/getPage`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }

    getDocType(): Observable<any> {
        return this.get('/api/document_types/show'); }
    getEngineer(): Observable<any> {
        return this.get('/api/employees/showall_engineer'); }
    getCustomer(): Observable<any> {
        return this.get('/api/customer/showall_backoffice'); }
    getInsurance(): Observable<any> {
        return this.get('/api/insurance_name/showall'); }
}
