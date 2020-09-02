import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartLegendOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { DataHandlingService } from '../service/data-handling.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public chartOptions: any = {
    legend: { position: 'bottom' }
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

  }

  ngOnInit() {
    let completedCount: number = 0;
    this.dataService.fetchData().subscribe({
      next:items=>{
        let noOfItems = items.length;
        console.log("No of items ",noOfItems);
        items.forEach(ele=>{
          if(ele.completed)
            completedCount++;
        })
        console.log("No of completed todos ",completedCount);
        this.pieChartData[0] = completedCount;
        this.pieChartData[1] = noOfItems - completedCount;
      }      
    });
  }
}
