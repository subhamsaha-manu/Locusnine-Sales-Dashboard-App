import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { DataHandlingService } from './service/data-handling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo Dashboard';
  data : any;
  constructor(public dialog: MatDialog,private dataService:DataHandlingService) {
    dataService.fetchData();
    this.data = dataService.listOfTodos;
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewChecked(){
    this.dataService.fetchData().subscribe(data=>{
      this.dataService.listOfTodos = data;
    });
  }
}
