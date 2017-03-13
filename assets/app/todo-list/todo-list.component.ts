import {Component, OnInit, OnDestroy} from '@angular/core';
import { ToDo } from '../classes/ToDo';
import {SortablejsOptions} from "angular-sortablejs";
import { ApiService } from "../services/api.service";

@Component({
    selector: 'todo-list',
    templateUrl: '../../templates/todo-list.html',
    providers: [ ApiService ]
})
export class ToDoListComponent implements OnInit {

    public toDos: ToDo[] = [];

    public formData = {
        task: "",
        category: "Uncategorized"
    };

    private categoryOptions: Array<string> = [
        "Uncategorized",
        "Groceries",
        "Home Improvement",
        "Work",
        "Car"
    ];

    private options: SortablejsOptions = {
        animation: 150,
        onEnd: () => {
            this.onReOrderComplete();
        }
    };

    public loading: boolean = true;
    public thinking: boolean = false;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.getAllTodos();
    }

    getAllTodos(): void {
        this.apiService.getAllToDos().then(
            (response: Array<ToDo>) => {
                this.loading = false;
                this.toDos = response;
            },
            error => function() {
                Materialize.toast('There was a problem with your email.', 4000, 'red');
                $('#completionModal').modal().modal('open');
                console.error(error);
            });
    }

    showAdd(): void {
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

    addToDo(): void {
        this.thinking = true;

        this.apiService.createNewToDo(this.formData.task, this.formData.category).then(
            response => {
                this.toDos.push(response);
                this.thinking = false;
                $('#add-modal').modal('close');
                Materialize.toast('Your new task was added.', 4000, 'green');
            },
            error => function() {
                this.thinking = false;
                Materialize.toast('There was a problem with your task.', 4000, 'red');
                console.error(error);
            });
    }

    completeToDo(id: string, index: number) {
        let complete = this.toDos[index].complete;
        if (complete) {
            this.toDos[index].complete = false;
        } else {
            this.toDos[index].complete = true;
        }

        this.apiService.updateToDo(id, this.toDos[index].complete).then(
            response => {
                Materialize.toast('Your task was updated.', 4000, 'green');
            },
            error => function() {
                Materialize.toast('There was a problem setting your task.', 4000, 'red');
                console.error(error);
            });
    }

    deleteToDo(id: string, index: number) {
        this.toDos.splice(index, 1);

        this.apiService.deleteToDo(id).then(response => {
            Materialize.toast('You task was deleted', 4000, 'green');
        }, error => {
            Materialize.toast('There was a problem deleting your task', 4000, 'red');
        });
    }

    onReOrderComplete(): any {
        this.apiService.updateToDoList(this.toDos).then(response => {
            //
        }, error => {
            Materialize.toast('There was a problem updating your tasks.', 4000, 'red');
        });
    }
}