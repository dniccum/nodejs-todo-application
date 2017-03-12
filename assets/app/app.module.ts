import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SortablejsModule } from "angular-sortablejs";
import { AppComponent }   from './app.component';
import { ToDoListComponent } from "./todo-list/todo-list.component";
import { ToDoListingComponent } from "./todo-list/todo-listing.component";
import { ApiService } from "./services/api.service";

@NgModule({
    declarations: [
        AppComponent,
        ToDoListComponent,
        ToDoListingComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        SortablejsModule
    ],
    bootstrap:    [AppComponent],
    providers: [
        ApiService
    ]
})
export class AppModule {}
