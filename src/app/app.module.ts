import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';  

import { AgGridModule} from 'ag-grid-angular';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ChartComponent,
    TodoFormComponent,
    BtnCellRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    AgGridModule.withComponents([BtnCellRendererComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
