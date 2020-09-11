import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  public rowSelection;
  public getRowNodeId;
  
  clickEventListener: Subscription;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @Input() flag:string;
  
  columnDefs = [
    { headerName: 'Todo Task', field: 'text', tooltipField: 'text',checkboxSelection: true},
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
    //console.log(screen.width);

    this.clickEventListener = this.dataService.getClickEvent().subscribe((data)=>{
      //console.log("After submit render table",data);
      this.modifyTable(data);
    });
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRendererComponent
    };


    if (screen.width > 768)
      this.paginationPageSize = 5;
    else {
      this.paginationPageSize = 4;
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
    };
    this.getRowNodeId = function (data) {
      return data.id;
    };
    this.domLayout = 'autoHeight';
    this.tooltipShowDelay =100;
    this.rowSelection = 'multiple';
  }

  onRowClicked(event: any) 
  { 
    //console.log('row',event.data);
    this.dialog.open(TodoFormComponent,{
      data: {id:event.data.id,text: event.data.text, completed: event.data.completed}
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.dataService.listOfTodos;        
    //this.renderTable();   
  }
  modifyTable(data?:DATA){
    if(data){
      //console.log("Data being pushed",this.rowData.filter(ele=>{if(ele.id === 1){console.log(typeof(ele.id))}}));
      //console.log("Data being pushed",data.id);
      let rowNode = this.gridApi.getRowNode(data.id+"");
      //console.log(rowNode);
      if(rowNode){
        console.log("To be updated record ",rowNode.data);
        rowNode.setDataValue('text', data.text);
        rowNode.setDataValue('completed', data.completed);
      }else{
        //console.log("Add section");
        this.gridApi.applyTransaction({ add: [data] });
      }      
    }
    //
  }
  ngOnChanges(){
    //console.log("Grid options ",this.flag);
    if(this.gridApi)
      this.gridApi.setQuickFilter(this.flag);
  }

  onRemoveSelected(){
    var selectedRows = this.gridApi.getSelectedRows();
    
    this.dataService.deleteData(selectedRows).subscribe(data=>{
      console.log("Response on delete ",data);      
      this.gridApi.applyTransaction({remove:selectedRows});
      selectedRows.forEach(element => {
        console.log("Index of ",this.dataService.listOfTodos.indexOf(element));
        var index = this.dataService.listOfTodos.indexOf(element);
        this.dataService.listOfTodos.splice(index,1);
        console.log("After delete ",this.dataService.listOfTodos);
        this.dataService.sendClick();
      });
    });    
  }

  addNewTask() {
    const dialogRef = this.dialog.open(TodoFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
