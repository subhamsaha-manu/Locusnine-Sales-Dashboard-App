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
  title = 'Locusnine-Sales-Dashboard-App';
  data : any;
  constructor(public dialog: MatDialog,private dataService:DataHandlingService) {
    dataService.fetchData();
    this.data = dataService.data;
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
