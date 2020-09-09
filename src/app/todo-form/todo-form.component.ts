import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlingService, DATA } from '../service/data-handling.service';
import { ChartComponent } from '../chart/chart.component';




@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DATA,private dataService:DataHandlingService) {
    if (data) {
      console.log("Dialog open", typeof(data.text));
      this.todoForm.patchValue({
        text: data.text,
        completed: data.completed+""
      });
    }
  }


  ngOnInit(): void {
  }

  todoForm = new FormGroup({
    text: new FormControl('', Validators.required),
    completed: new FormControl()
  });

  onSubmit() {
    this._snackBar.open('Task Successfully Added', ':)', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    console.log(this.todoForm.value);
    this.dataService.saveData(this.todoForm.value).subscribe(data=>{
      this.dataService.listOfTodos.push(data);
      console.log("After push length ",this.dataService.listOfTodos.length);
      this.dialogRef.close();
      this.dataService.sendClick();
    })    
    //this.chart.renderChart();
  }
}
