import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService {

  public url: string;

  constructor( private _http: HttpClient) {
    this.url = Global.url;
  }

  testService(){ return 'Test project service in angular'; }

  /* ************* Save new project***************** */
  saveProject(project: Project): Observable<any> {
    // Convert to json
    let params = JSON.stringify(project);
    // Set http headers
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'save-project', params, { headers: headers});
  }

  /* ************* projects List ***************** */
  getProjects(): Observable<any> {
    // Set http headers
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Ajax request --> GET
    return this._http.get(this.url + 'projects', {headers: headers});
  }

  /* ******************* project detail *****************/
  getProject(id: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'project/' + id, {headers: headers});
  }

  /* **************** Delete Project ************************/
  deleteProject(id: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'project/' + id, {headers: headers});
  }

}
