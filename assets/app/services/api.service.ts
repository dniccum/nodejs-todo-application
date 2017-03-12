import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CSRFToken } from '../classes/CSRFToken';
import { ToDo } from "../classes/ToDo";

// rxjs dependencies
import '../rxjs-operators';

@Injectable()
export class ApiService {

    private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    private options: RequestOptions = new RequestOptions({ headers: this.headers });

    constructor(private http:Http) { }

    getAllToDos(): any {
        return new Promise((resolve, reject) => {
            return this.http.get(`/api/todo`, this.options).toPromise().then(response => {
                return resolve(response.json());
            }, error => {
                return reject(error);
            });
        });
    }

    getCSRF(): Promise<CSRFToken> {
        return new Promise((resolve) => {
            this.http.get(`/csrfToken`, this.options).toPromise().then(response => {
                return resolve(response.json());
            });
        });
    }

    createNewToDo(text: string, category: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse: CSRFToken) => {
                let params = {
                    text: text,
                    category: category,
                    _csrf: tokenResponse._csrf
                };

                this.http.post(`/api/todo`, params, this.options).toPromise().then(response => {
                    return resolve(response.json());
                }, error => {
                    return reject(error);
                });
            });
        });
    }

    updateToDo(id: string, complete: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse: CSRFToken) => {
                let params = {
                    id: id,
                    complete: complete,
                    _csrf: tokenResponse._csrf
                };

                this.http.put(`/api/todo`, params, this.options).toPromise().then(response => {
                    return resolve();
                }, error => {
                    return reject(error);
                });
            });
        });
    }

    updateToDoList(toDoArray: Array<ToDo>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse: CSRFToken) => {
                let params = {
                    toDoList: toDoArray,
                    _csrf: tokenResponse._csrf
                };

                this.http.put(`/api/todo/update-group`, params, this.options).toPromise().then(response => {
                    return resolve();
                }, error => {
                    return reject(error);
                });
            });
        });
    }

    deleteToDo(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse: CSRFToken) => {
                let params = {
                    id: id,
                    _csrf: tokenResponse._csrf
                };

                let deleteOptions: RequestOptions = new RequestOptions({
                    headers: this.headers,
                    body: params
                });

                this.http.delete(`/api/todo`, deleteOptions).toPromise().then(response => {
                    return resolve(response);
                }, error => {
                    return reject(error);
                });
            });
        });
    }

}