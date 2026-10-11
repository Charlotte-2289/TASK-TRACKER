//This interface describes the shape of a Task
export interface TaskDetail{
    taskID:number;
    title:string;
    createdAt:string;
    isCompleted:boolean;
}

//What we send when creating a task
//everything exxept the ID , sqlServer generates the ID

export type NewTask = Omit<TaskDetail ,'taskID'>;