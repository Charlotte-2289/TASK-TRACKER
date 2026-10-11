import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { NewTask,TaskDetail } from '../models/task.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskApi {
  //ask angular for its http tool
  private http =inject(HttpClient);
  //get the api base url 
  private url = `${environment.apiBaseUrl}/TaskDetail`;


  //get all the tasks
  getAll():Observable<TaskDetail[]>{
    return this.http.get<TaskDetail[]>(this.url);
  }

  //Create a task
  createTask(task:NewTask):Observable<TaskDetail>{
    return this.http.post<TaskDetail>(this.url,task);
  }

  //update task
  updateTask(task:TaskDetail):Observable<void>{
    return this.http.put<void>(`${this.url}/${task.taskID}`,task);
  }

  //delete a task
  removeTask(taskID:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${taskID}`);
  }
}