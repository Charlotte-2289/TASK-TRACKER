import { Component, computed,inject, signal } from '@angular/core';
import { TaskStore } from '../../services/task-store';
import { FormsModule } from '@angular/forms';

type filter ='all'|'pending'|'completed'
@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

  store = inject(TaskStore);
  newTitle ='';
  filter = signal<filter>('all');

  visibleTasks =computed(()=>{
   const list =this.store.tasks();
   switch(this.filter()){
    case 'pending' : return list.filter(t=>!t.isCompleted);
    case 'completed': return list.filter(t=>t.isCompleted);
    default: return list;
  }
  })


  addTasks(){
    const title = this.newTitle.trim();
    if(!title) return;
    this.store.add(title);
  }
  

}
