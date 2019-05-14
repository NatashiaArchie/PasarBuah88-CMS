import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { OrderService } from '../shared/order.service';
import Chart from 'chart.js';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  index = 5;
  chart: [];
  deliveryTime: string[] = [];
  DataDT: number[] = [];
  dt12 = 0;
  dt01 = 0;
  dt02 = 0;
  dt03 = 0;
  dt04 = 0;
  dt05 = 0;
  dt06 = 0;
  dt07 = 0;

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.refreshList();
    this.DeliveryTime();
    
  }

  

  DeliveryTime() {
    this.DataDT = [];
    this.orderService.getOrderMap()
    .subscribe( res => { 
      for(var i=0; i < Object.keys(res).length; i++) {
        this.deliveryTime.push(res[i].DeliveryTime)
      } 
      console.log(this.deliveryTime);
      for(var i=0; i < Object.keys(res).length; i++) {
        if (this.deliveryTime[i] == "12PM - 01PM") {
          this.dt12++;
        }
        else if (this.deliveryTime[i] == "01PM - 02PM") {
          this.dt01++;
        }
        else if (this.deliveryTime[i] == "02PM - 03PM") {
          this.dt02++;
        }
        else if (this.deliveryTime[i] == "03PM - 04PM") {
          this.dt03++;
        }
        else if (this.deliveryTime[i] == "04PM - 05PM") {
          this.dt04++;
        }
        else if (this.deliveryTime[i] == "05PM - 06PM") {
          this.dt05++;
        }
        else if (this.deliveryTime[i] == "06PM - 07PM") {
          this.dt06++;
        }
        else if (this.deliveryTime[i] == "07PM - 08PM") {
          this.dt07++;
        }
      }
      this.DataDT.push(this.dt12, this.dt01, this.dt02, this.dt03, this.dt04, this.dt05, this.dt06, this.dt07) ;
      console.log(this.DataDT);

      this.DTChart(this.DataDT);
      
  });

 
  }

  DTChart(data: any) {
    this.chart = new Chart('DTChart', {
      type: 'line',
      data: {
        labels: ['12PM-01PM','01PM-02PM','02PM-03PM','03PM-04PM','04PM-05PM','05PM-06PM','06PM-07PM','07PM-08PM'],
        datasets: [{ 
            data: data,
            borderColor: "#8cba2d",
            backgroundColor:"#d4dfbd"
        }]  
      },
      options: {
				responsive: true,
				scales: {
					yAxes: [{
						ticks: {
              beginAtZero: true,
              min: 0,
              stepsize: 1
						}
					}]
				}
			}
    });
  }
}
