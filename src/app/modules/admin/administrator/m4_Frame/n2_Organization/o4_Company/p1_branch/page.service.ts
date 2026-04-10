import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { DataTablesResponse } from 'app/shared/datatable.types';
import { BaseService } from 'app/app.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class Service extends BaseService {
    private _materials: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    constructor(_httpClient: HttpClient) {
        super(_httpClient);
    }

    // CRUD operations
    create(data: any): Observable<any> { return this.post('/api/Brache/add', data); }
    update(data: any, id: string): Observable<any> { return this.post(`/api/Brache/update/${id}`, data); }
    delete(id: string): Observable<any> { return this._httpClient.delete(`${environment.API_URL}/api/Brache/delete/${id}`, this.httpOptions); }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient.post<any>(`${environment.API_URL}/api/Brache/getPage`, dataTablesParameters, this.httpOptions)
            .pipe(map(response => response.data as DataTablesResponse));
    }
    getByid(id: string): Observable<any> {
        return this._httpClient.get(environment.API_URL + '/api/Brache/showID/' + id).pipe(
            tap((meterial) => {
                this._materials.next(meterial);
            })
        );
    }

}
