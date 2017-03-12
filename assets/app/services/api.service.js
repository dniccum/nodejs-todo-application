"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
// rxjs dependencies
require("../rxjs-operators");
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    getAllToDos() {
        return new Promise((resolve, reject) => {
            return this.http.get(`/api/todo`, this.options).toPromise().then(response => {
                return resolve(response.json());
            }, error => {
                return reject(error);
            });
        });
    }
    getCSRF() {
        return new Promise((resolve) => {
            this.http.get(`/csrfToken`, this.options).toPromise().then(response => {
                return resolve(response.json());
            });
        });
    }
    createNewToDo(text, category) {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse) => {
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
    updateToDo(id, complete) {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse) => {
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
    updateToDoList(toDoArray) {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse) => {
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
    deleteToDo(id) {
        return new Promise((resolve, reject) => {
            this.getCSRF().then((tokenResponse) => {
                let params = {
                    id: id,
                    _csrf: tokenResponse._csrf
                };
                let deleteOptions = new http_1.RequestOptions({
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
};
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map