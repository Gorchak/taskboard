import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TasksService } from '../../services/tasks.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private tasksService: TasksService
  ) {
    this.addTaskForm = new FormGroup({
      "taskName": new FormControl("", Validators.required),
    });
    this.taskEditForm = new FormGroup({
      "taskName": new FormControl("", Validators.required),
    });
    this.addListForm = new FormGroup({
      "listName": new FormControl("", Validators.required),
    });
  }

  addTaskForm: FormGroup;
  addListForm: FormGroup;
  taskEditForm: FormGroup;

  lists: Array<any>;
  listsNames: Array<string>;
  isShowTaskForm = false;
  isShowForm = false;
  currentListName = '';
  currentTaskName = '';
  editTaskNameTemp = '';
  deleteTaskName = '';

  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

  // test1 = [
  //   'test up',
  //   'wrwrew teeth',
  //   'Take a werrrrrr',
  //   'Check e-mssssssssssssail',
  //   'Wadddddddddddlk ddas'
  // ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.tasksService.saveList(this.lists);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.tasksService.saveList(this.lists);
    }
  }

  addList() {
    if (this.addListForm.valid) {
      let listItem = {
        name: this.addListForm.controls.listName.value,
        tasks: []
      }
      this.lists.push(listItem);

      this.tasksService.saveList(this.lists);
      this.addListForm.reset();
      this.isShowForm = false;
    }
  }


  addTask(list) {
    if (this.addTaskForm.valid) {
      let taskItem = {
        name: this.addTaskForm.controls.taskName.value
      }
      let listIndex = this.lists.indexOf(list);
      this.lists[listIndex].tasks.push(taskItem);

      this.tasksService.saveList(this.lists);
      this.addTaskForm.reset();
      this.isShowTaskForm = false;
      this.currentListName = null;
    }
  }

  saveList() {
    this.tasksService.saveList(this.lists);
    this.currentTaskName = '';
    this.editTaskNameTemp = '';
  }

  deleteTask(list, item) {
    debugger;
    let index = list.tasks.indexOf(item);

    list.tasks.splice(index, 1);
    this.tasksService.saveList(this.lists);
    this.deleteTaskName = '';
  }

  ngOnInit() {
    this.lists = this.tasksService.getLists();

    var names = this.lists.map(function (item) {
      return item.name;
    });

    this.listsNames = names;

  }

}
