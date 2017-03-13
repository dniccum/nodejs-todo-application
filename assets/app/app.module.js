"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const angular_sortablejs_1 = require("angular-sortablejs");
const app_component_1 = require("./app.component");
const todo_list_component_1 = require("./todo-list/todo-list.component");
const todo_listing_component_1 = require("./todo-list/todo-listing.component");
const api_service_1 = require("./services/api.service");
// TESTS ENVIRONMENT MODE
if (window["inStaging"] || window["inProduction"]) {
    core_1.enableProdMode();
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            todo_list_component_1.ToDoListComponent,
            todo_listing_component_1.ToDoListingComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            angular_sortablejs_1.SortablejsModule
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            api_service_1.ApiService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map