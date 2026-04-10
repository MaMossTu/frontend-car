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
    // create(data: any): Observable<any> { return this.post('/api/vehicle/brands/add', data); }
    create(data: any): Observable<any> { return this.post('/api/line_item/add', data); }
    update( id: string, data: any,): Observable<any> { return this.post(`/api/line_item/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/LineItem/delete/${id}`, this.httpOptions); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/Getpage/line_item`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }

    updateStatus(data: any, id: string): Observable<any>
    { return this.put(`/api/line_item/update_operation/${id}`, data); }
}
