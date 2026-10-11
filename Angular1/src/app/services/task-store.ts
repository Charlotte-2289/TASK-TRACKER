import { inject, computed,Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskDetail } from '../models/task.model';
import { TaskApi } from './task-api';
@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private api = inject(TaskApi);
  //Define  the state (signals)
  readonly tasks = signal<TaskDetail[]>([]);
  readonly loading = signal(false);
  readonly  error = signal<String|null>(null);

  //define values calculated from state
  readonly total = computed(()=>this.tasks().length)
  readonly completed = computed(()=>this.tasks().filter(t=>t.isCompleted).length);
  readonly pending =computed(()=>this.total()-this.completed());
  readonly percentDone = computed(()=>
    //checks whether the total is zero
  this.total() === 0 
  ? 0
  :Math.round((this.completed() / this.total())*100)
);

//The 5 newest tasks
/**
 *   ... spread operator
 *  [...] create a new array containing those tasks
 * sort the tasks in descending order
 */
readonly recent =computed(()=>
[...this.tasks()].sort((a,b)=>
                        b.taskID-a.taskID)
                 .slice(0,5)
                
)

constructor(){
this.load();
}
//Actions
load(){
this.loading.set(true);
this.error.set(null);
this.api.getAll().subscribe({
  next: tasks =>{
    this.tasks.set(tasks);
    this.loading.set(false);
  },
  error: (err: HttpErrorResponse)=>{
    this.loading.set(false);
    this.fail("load tasks :",err);
  }
})
}
  
add(title :string){
this.error.set(null);
const newTask={
  title,
  createdAt: new Date().toISOString().slice(0,10),
  isCompleted :false
}
this.api.createTask(newTask).subscribe({
  next: created =>this.tasks.update(list=>[...list,created]),
  error: (err:HttpErrorResponse)=>{
    this.fail("Create task:",err);
  }
})
}

edit(task:TaskDetail){
this.error.set(null);
const updated={
  ...task, isCompleted: !task.isCompleted
}
this.api.updateTask(updated).subscribe({
  next:()=>this.tasks.update(list=>list.map(t=>(t.taskID===task.taskID ? updated :t))),
  error: (err: HttpErrorResponse)=>{
    this.fail("Update task: ", err)
  }
})
}

remove(taskID:number){
this.error.set(null);
this.api.removeTask(taskID).subscribe({
  next:()=>this.tasks.update(list=>list.filter(t=>t.taskID !== taskID)),
  error: (err:HttpErrorResponse)=>{
    this.fail("Delete task: ",err)
  }
})
}

fail(action :string , err:HttpErrorResponse){
  if(err.status===0){
    this.error.set(`Could not reach api .Check where it is running`)
  }else if(err.status===404){
    this.error.set(`Could not ${action} that task is not found`)
  }else{
    this.error.set(`Could not ${action}(server error ${err.status})`)
  }
}
}
