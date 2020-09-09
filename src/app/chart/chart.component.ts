import { Component, OnInit,ViewChild } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { DataHandlingService } from '../service/data-handling.service';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  clickEventListener: Subscription;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public chartOptions: any = {
    legend: { position: 'bottom' },
  };
  public pieChartLabels: Label[] = ['Completed Task', 'Incomplete Task'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColor: any = [
    {
      backgroundColor: ['rgba(152,251,152, 0.8)',
        'rgba(255,99,71,0.9)'
      ]
    }
  ]

  constructor(private dataService: DataHandlingService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.clickEventListener = this.dataService.getClickEvent().subscribe(() => {
      console.log("Chart post click");
      this.renderChart();
    });
  }

  ngOnInit() {
    setTimeout(() => this.renderChart(), 500);
  }
  renderChart() {
    let completedCount: number = 0;
    if (this.dataService.listOfTodos) {
      this.dataService.listOfTodos.forEach(item => {
        if (item.completed)
          completedCount++;
      });
      let noOfItems = this.dataService.listOfTodos.length;
      /*console.log("No of items ", noOfItems);
      console.log("No of completed todos ", completedCount);*/
      this.pieChartData[0] = completedCount;
      this.pieChartData[1] = noOfItems - completedCount;
    }
    this.chart.chart.update();
    console.log("Chart options ",this.chart.chart);
  }
}
