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
let ToDoListingComponent = class ToDoListingComponent {
    constructor() {
        this.toDoCompleted = new core_1.EventEmitter();
        this.toDoDeleted = new core_1.EventEmitter();
    }
    deleteToDo() {
        this.toDoDeleted.emit(this.toDoInformation.id);
    }
    completeToDo() {
        this.toDoCompleted.emit(this.toDoInformation.id);
    }
    getCategoryColor() {
        let colorObject = {
            "Uncategorized": "grey",
            "Groceries": "blue",
            "Home Improvement": "deep-purple",
            "Work": "cyan",
            "Car": "teal"
        };
        return colorObject[this.toDoInformation.category];
    }
};
__decorate([
    core_1.Input('information'),
    __metadata("design:type", Object)
], ToDoListingComponent.prototype, "toDoInformation", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ToDoListingComponent.prototype, "toDoCompleted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ToDoListingComponent.prototype, "toDoDeleted", void 0);
ToDoListingComponent = __decorate([
    core_1.Component({
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
    }),
    __metadata("design:paramtypes", [])
], ToDoListingComponent);
exports.ToDoListingComponent = ToDoListingComponent;
//# sourceMappingURL=todo-listing.component.js.map