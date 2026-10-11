import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tasks } from './pages/tasks/tasks';
import { NotFound } from './pages/not-found/not-found';
export const routes: Routes = [
    {path:'',redirectTo:'',pathMatch:'full'},
    {path:'dashboard', component : Dashboard},
    {path:'tasks', component :Tasks},
    {path:'**',component:NotFound}
];
