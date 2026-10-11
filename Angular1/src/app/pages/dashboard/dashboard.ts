import { Component, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import { TaskStore } from '../../services/task-store';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
store =inject(TaskStore)
}
