import { Component, OnInit, inject } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  taskObj : Task = new Task();
  taskArr : Task[] = [];
  addTaskValue : string = '';
  editTaskValue : string = '';

  crudSvc = inject(CrudService);

  ngOnInit(): void {
    this.taskObj = new Task(); //resets the value of taskObj
    this.taskArr = [];
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.getAllTaskComp(); //it loads a refreshed value for taskArr
  }


  addTaskComp(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudSvc.addTask(this.taskObj).subscribe({
      next: (value) => {
        console.log(`Observer addTaskComp: Value of the emission is "${value}"`)
        this.ngOnInit();
        this.addTaskValue = '';
      },

      complete: () => console.log(`Observer addTaskComp: Triggered a COMPLETE.`),

      error: (myError: Error) =>
        console.log(
          `Observer addTaskComp: Triggered an error, the message is : "${myError}"`
        ),
    });
  }
  
  getAllTaskComp(): void {
    this.crudSvc.getAllTask().subscribe({
      next: (value) => {
        console.log(`Observer getAllTaskComp: getAllTask returned value = "${value}"`)
        this.taskArr = value;
      },

      complete: () => console.log(`Observer getAllTaskComp: Triggered a COMPLETE.`),

      error: (myError: Error) =>
        console.log(
          `Observer getAllTaskComp: Triggered an error, the message is : "${myError}"`
        ),
    });
  }


  deleteTaskComp(focusTask: Task){
    this.crudSvc.deleteTask(focusTask).subscribe({
      next: () => {
        console.log(`Observer deleteTaskComp: Id of Value of focusTask.id is "${focusTask.id}"`)
        this.ngOnInit();
      },
      
      complete: () => console.log(`Observer deleteTaskComp: Triggered a COMPLETE.`),
      
      error: (myError: Error) => {
        
        console.log(`Observer deleteTaskComp: Id of Value of focusTask.id is "${focusTask.id}"`)
        console.log(
          `Observer deleteTaskComp: Triggered an error, the message is : "${myError}"`
          )},
        });
      }
      
      editTaskComp(){
        this.taskObj.task_name = this.editTaskValue;
        this.crudSvc.editTask(this.taskObj).subscribe({
          next: () => {
            console.log(`Observer editTaskComp: Id of Value of this.taskObj.id is "${this.taskObj.id}"`)
            this.ngOnInit();
          },
          
          complete: () => console.log(`Observer editTaskComp: Triggered a COMPLETE.`),
          
          error: (myError: Error) => {
            
            console.log(`Observer editTaskComp: Id of Value of this.taskObj.id is "${this.taskObj.id}"`)
            console.log(
              `Observer editTaskComp: Triggered an error, the message is : "${myError}"`
              )},
            });
          }

          call(editTask: Task){
            this.taskObj = editTask;
            this.editTaskValue = editTask.task_name;
          }
}//end

