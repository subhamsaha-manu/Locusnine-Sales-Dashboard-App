import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component';
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
    { headerName: 'Make', field: 'make', tooltipField: 'make', },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Rate', field: 'price', filter: false },
    {
      headerName: 'Edit',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: function () {
          let selectedNodes = this.gridApi.getSelectedNodes();
          let selectedData = selectedNodes.map(node => node.data);
          console.log("Selected Data ", selectedData);
        }
      }
    }
  ];

  rowData: any;
  constructor(private http: HttpClient) {
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json'
      )
      .subscribe(data => {
        this.rowData = data;
      });
  }
}
