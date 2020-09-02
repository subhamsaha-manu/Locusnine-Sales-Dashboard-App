import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  text: string;
  isCompleted: boolean;
}


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data) {
      console.log("Dialog open", data.isCompleted);
      this.todoForm.patchValue({
        todoText: data.text,
        isCompleted: data.isCompleted+""
      });
    }
  }


  ngOnInit(): void {
  }

  todoForm = new FormGroup({
    todoText: new FormControl('', Validators.required),
    isCompleted: new FormControl()
  });

  onSubmit() {
    this._snackBar.open('Task Successfully Added', ':)', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    console.log(this.todoForm.value);
    this.dialogRef.close();
  }
}
