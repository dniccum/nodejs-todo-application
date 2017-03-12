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
const api_service_1 = require("../services/api.service");
let ToDoListComponent = class ToDoListComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.toDos = [];
        this.formData = {
            task: "",
            category: "Uncategorized"
        };
        this.categoryOptions = [
            "Uncategorized",
            "Groceries",
            "Home Improvement",
            "Work",
            "Car"
        ];
        this.options = {
            animation: 150,
            onEnd: () => {
                this.onReOrderComplete();
            }
        };
        this.loading = true;
        this.thinking = false;
    }
    ngOnInit() {
        this.getAllTodos();
    }
    getAllTodos() {
        this.apiService.getAllToDos().then((response) => {
            this.loading = false;
            this.toDos = response;
            console.log(response);
        }, error => function () {
            Materialize.toast('There was a problem with your email.', 4000, 'red');
            $('#completionModal').modal().modal('open');
            console.error(error);
        });
    }
    showAdd() {
        let modal = $('#add-modal');
        modal.modal({
            complete: () => {
                this.formData.task = "";
                this.formData.category = "Uncategorized";
                Materialize.updateTextFields();
            }
        });
        modal.modal('open');
    }
    addToDo() {
        this.thinking = true;
        this.apiService.createNewToDo(this.formData.task, this.formData.category).then(response => {
            this.toDos.push(response);
            this.thinking = false;
            $('#add-modal').modal('close');
            Materialize.toast('Your new task was added.', 4000, 'green');
        }, error => function () {
            this.thinking = false;
            Materialize.toast('There was a problem with your task.', 4000, 'red');
            console.error(error);
        });
    }
    completeToDo(id, index) {
        let complete = this.toDos[index].complete;
        if (complete) {
            this.toDos[index].complete = false;
        }
        else {
            this.toDos[index].complete = true;
        }
        this.apiService.updateToDo(id, this.toDos[index].complete).then(response => {
            Materialize.toast('Your task was updated.', 4000, 'green');
        }, error => function () {
            Materialize.toast('There was a problem setting your task.', 4000, 'red');
            console.error(error);
        });
    }
    deleteToDo(id, index) {
        this.toDos.splice(index, 1);
        this.apiService.deleteToDo(id).then(response => {
            Materialize.toast('You task was deleted', 4000, 'green');
        }, error => {
            Materialize.toast('There was a problem deleting your task', 4000, 'red');
        });
    }
    onReOrderComplete() {
        this.apiService.updateToDoList(this.toDos).then(response => {
            //
        }, error => {
            Materialize.toast('There was a problem updating your tasks.', 4000, 'red');
        });
    }
};
ToDoListComponent = __decorate([
    core_1.Component({
        selector: 'todo-list',
        templateUrl: '../../templates/todo-list.html',
        providers: [api_service_1.ApiService]
    }),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ToDoListComponent);
exports.ToDoListComponent = ToDoListComponent;
//# sourceMappingURL=todo-list.component.js.map