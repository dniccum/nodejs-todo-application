import {Component, Output, EventEmitter, Input} from '@angular/core';
import { ToDo } from '../classes/ToDo';

@Component({
    selector: '.todo-listing',
    template: `<td style="width: 70%">
                {{ toDoInformation.text }}
                <span class="new badge" data-badge-caption="" [ngClass]="getCategoryColor()">{{ toDoInformation.category}}</span>
              </td>
              <td class="right-align">
                <button type="button"  (click)="completeToDo()" *ngIf="!toDoInformation.complete" class="btn green lighten-1 waves-light">
                  <i class="material-icons">done</i>
                </button>
                <button type="button"  (click)="completeToDo()" *ngIf="toDoInformation.complete" class="btn grey darken-1 waves-light">
                  <i class="material-icons">replay</i>
                </button>
                <button type="button" (click)="deleteToDo()" class="btn red darken-2 waves-light">
                  <i class="material-icons">delete</i>
                </button>
              </td>`
})
export class ToDoListingComponent {
    @Input('information') toDoInformation: ToDo;
    @Output() toDoCompleted = new EventEmitter();
    @Output() toDoDeleted = new EventEmitter();

    constructor() { }

    deleteToDo(): void {
        this.toDoDeleted.emit(this.toDoInformation.id);
    }

    completeToDo(): void {
        this.toDoCompleted.emit(this.toDoInformation.id);
    }

    getCategoryColor(): string {
        let colorObject = {
            "Uncategorized": "grey",
            "Groceries": "blue",
            "Home Improvement": "deep-purple",
            "Work": "cyan",
            "Car": "teal"
        };

        return colorObject[this.toDoInformation.category];
    }
}