import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Duty } from '../models/duty.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllDuties(): Observable<Duty[]> {
    return this.http.get<Duty[]>(this.baseApiUrl + '/api/duty');
  }

  addDuty(addDutyRequest: Duty): Observable<Duty> {
    return this.http.post<Duty>(this.baseApiUrl + '/api/duty', addDutyRequest);
  }

  getDuty(id: number | string | null): Observable<Duty> {
    return this.http.get<Duty>(this.baseApiUrl + '/api/duty/' + id);
  }

  updateDuty(id: string | number, updateDutyRequest: Duty): Observable<Duty> {
    return this.http.put<Duty>(
      this.baseApiUrl + '/api/duty/' + id,
      updateDutyRequest
    );
  }
  deleteDuty(id: string | number): Observable<Duty> {
    return this.http.delete<Duty>(this.baseApiUrl + '/api/duty/' + id);
  }

  getProjectDuties(id: number | string | null): Observable<Duty[]> {
    if (id) {
      return this.http.get<Duty[]>(this.baseApiUrl + '/api/duty/project/' + id);
    } else {
      return of([]);
    }
  }

  switchDutyStatus(id: string | number): Observable<Duty> {
    return this.http.put<Duty>(
      this.baseApiUrl + '/api/duty/status/' + id,
      null
    );
  }
}
