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
    create(data: any): Observable<any> { return this.post('/api/user/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/user/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/user/delete/${id}`, this.httpOptions); }
    getUsers(): Observable<any> { return this.get('/api/user/show'); }
    getUserById(id: string | number): Observable<any> { return this.get(`/api/user/showID/${id}`); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/user/getPage`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }

    getDepartment(): Observable<any> { return this.get('/api/department/show'); }
    getSubDepartment(): Observable<any> { return this.get('/api/subdepartment/show'); }
    getRole(): Observable<any> { return this.get('/api/role/show'); }
    updateUserPosition(data: any): Observable<any> { return this.post('/api/userposition/add', data); }
}
