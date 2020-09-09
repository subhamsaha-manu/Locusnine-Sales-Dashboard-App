import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { DataHandlingService, DATA } from '../service/data-handling.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  public paginationPageSize;
  public defaultColDef;
  public domLayout;
  public frameworkComponents;
  private gridApi;
  private gridColumnApi;
  public tooltipShowDelay;
  
  clickEventListener: Subscription;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs = [
    { headerName: 'Todo Task', field: 'text', tooltipField: 'text'},
    { headerName: 'Completed', field: 'completed' },
    {
      headerName: 'Update',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: function () {  
        }
      },
      width:100
    }
  ];

  rowData:DATA[];
  constructor(private http: HttpClient,public dialog: MatDialog,private dataService:DataHandlingService) {
    console.log(screen.width);

    this.clickEventListener = this.dataService.getClickEvent().subscribe(()=>{
      this.renderTable();
    });
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRendererComponent
    };


    if (screen.width > 768)
      this.paginationPageSize = 5;
    else {
      this.paginationPageSize = 5;
    }
    this.defaultColDef = {
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions :['contains'],
        buttons: ['reset'],
        debounceMs: 1000,
        suppressAndOrCondition: true,
      },
      sortable: true,
      flex: 1
    }
    this.domLayout = 'autoHeight';
    this.tooltipShowDelay =100;
  }

  onRowClicked(event: any) 
  { 
    console.log('row',event.data);
    this.dialog.open(TodoFormComponent,{
      data: {text: event.data.text, completed: event.data.completed}
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("Grid options ",this.gridApi);
    this.renderTable();   
  }
  renderTable(){
    if(this.dataService.listOfTodos){
      console.log("Render table()",this.dataService.listOfTodos.length);
    this.rowData = this.dataService.listOfTodos;
    }    
  }
}
