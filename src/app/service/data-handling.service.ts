import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface DATA {
  todoText : string,
  completed: boolean
}
@Injectable({
  providedIn: 'root'
})
export class DataHandlingService {

  constructor(private http: HttpClient) { }

  public data :DATA[];
  fetchData(){
    return this.http
      .get<DATA[]>(
        //'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json'
        'http://192.168.0.103:8080/todos/'
      );
  }
}
