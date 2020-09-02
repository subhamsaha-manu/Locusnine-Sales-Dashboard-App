import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { DataHandlingService } from '../service/data-handling.service';
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
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: 'Todo Text', field: 'text', tooltipField: 'text', },
    { headerName: 'Complete?', field: 'completed' },
    {
      headerName: 'Edit',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: function () {  
        }
      }
    }
  ];

  rowData: any;
  constructor(private http: HttpClient,public dialog: MatDialog,private dataService:DataHandlingService) {
    console.log(screen.width);

    this.frameworkComponents = {
      btnCellRenderer: BtnCellRendererComponent
    };


    if (screen.width > 768)
      this.paginationPageSize = 10;
    else {
      this.paginationPageSize = 5;
    }
    this.defaultColDef = {
      filter: true,
      sortable: true,
      flex: 1
    }
    this.domLayout = 'autoHeight';
  }

  onRowClicked(event: any) 
  { 
    console.log('row',event.data);
    this.dialog.open(TodoFormComponent,{
      data: {'text': event.data.text, isCompleted: event.data.completed}
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.dataService.fetchData().subscribe(data=>{
      this.rowData = data;
    });
  }
}
