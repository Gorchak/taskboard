import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  taskDescription: string;
  isEditDescription: string;
  currentList = this.data.listName;

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(data) {
    let test = this.currentList;

    
    this.tasksService.saveTask(data);
    // this.tasksService.saveList(this.lists);
  }

  ngOnInit() {
  }

}
