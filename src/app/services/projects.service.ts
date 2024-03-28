import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { Duty } from '../models/duty.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseApiUrl + '/api/project');
  }

  getProject(id: number | string | null): Observable<Project> {
    return this.http.get<Project>(this.baseApiUrl + '/api/project/' + id);
  }
  addProject(addProjectRequest: Project): Observable<Project> {
    return this.http.post<Project>(
      this.baseApiUrl + '/api/project',
      addProjectRequest
    );
  }
  updateProject(
    id: string | number,
    updateProjectRequest: Project
  ): Observable<Project> {
    return this.http.put<Project>(
      this.baseApiUrl + '/api/project/' + id,
      updateProjectRequest
    );
  }
  deleteProject(id: number | string): Observable<Project> {
    return this.http.delete<Project>(this.baseApiUrl + '/api/project/' + id);
  }
}
