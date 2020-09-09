import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';


export interface DATA {
  text: string,
  completed: boolean
}
@Injectable({
  providedIn: 'root'
})
export class DataHandlingService {

  private subject = new Subject<any>();

  sendClick(){
    this.subject.next();
  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }

  constructor(private http: HttpClient) { }

  public listOfTodos: DATA[];
  fetchData() {
    return this.http
      .get<DATA[]>(
        //'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json'
        'http://192.168.0.104:8080/todos/'
      );
  }

  saveData(formData:DATA) {
    return this.http
      .post<DATA>('http://192.168.0.104:8080/todos/', formData,{ responseType: "json" });
  }



}
