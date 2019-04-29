import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  getLists() {
    if (this.storage.get('Lists')) {
      return (this.storage.get('Lists'))
    } else {
      let lists = [];
      this.storage.set('Lists', lists);
      return this.storage.get('Lists');
    }
  }

  saveList(list) {
    this.storage.set('Lists', list);

    return list;
  }

  saveTask(data) {
    let lists = this.storage.get('Lists');

    let currentList = lists.filter(function(list) {
      return list.name === data.listName;
    });

    let listId = lists.indexOf(currentList[0]);
    lists[listId].tasks[data.taskId] = data.task;

    this.storage.set('Lists', lists);
  }

}
