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
  completionStatus:string='';
  constructor(public dialog: MatDialog,private dataService:DataHandlingService) {
    dataService.fetchData();
  }

  sendFalse(){
    this.completionStatus = 'false';
  }

  sendTrue(){
    this.completionStatus = 'true';
  }

  viewAll(){
    this.completionStatus='';
  }

  /*ngOnChanges(){
    this.dataService.fetchData();
  }*/
}
