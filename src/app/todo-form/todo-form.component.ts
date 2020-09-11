import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlingService, DATA } from '../service/data-handling.service';


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
      //console.log("Dialog open", typeof(data.id));
      this.todoForm.patchValue({
        id:+data.id,
        text: data.text,
        completed: data.completed+""
      });
    }
  }


  ngOnInit(): void {
  }

  todoForm = new FormGroup({
    id:new FormControl(),
    text: new FormControl('', Validators.required),
    completed: new FormControl(Validators.required)
  });

  onSubmit() {
    this._snackBar.open('Task Successfully Added/Modified', ':)', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    //console.log("Form component",this.todoForm.value);
    this.dataService.saveData(this.todoForm.value).subscribe(data=>{
      if(!this.dataService.listOfTodos.some(ele=>ele.id===data.id)){
        //Add section
        this.dataService.listOfTodos.push(data);
        console.log("After push length ",this.dataService.listOfTodos);
      }else{
        //Update Section
        console.log("Modified row ",data);
        console.log("Row to be modified ",this.dataService.listOfTodos);
        this.dataService.listOfTodos.forEach(ele=>{
          if(ele.id === data.id){
            var index = this.dataService.listOfTodos.indexOf(ele);
            this.dataService.listOfTodos[index].text = data.text;
            this.dataService.listOfTodos[index].completed = data.completed;
          }
        });
      }        
      this.dialogRef.close();
      this.dataService.sendClick(data);
    })    
    //this.chart.renderChart();
  }
}
