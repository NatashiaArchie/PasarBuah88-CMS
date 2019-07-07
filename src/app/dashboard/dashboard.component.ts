import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { OrderService } from '../shared/order.service';
import Chart from 'chart.js';
import * as moment from 'moment';
import 'rxjs/Rx';
import { ProductService } from '../shared/product.service';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  index = 5;
  chart: [];
  CPcount;
  deliveryTime: string[] = [];
  DataCP: number[] = [];
  DataDT: number[] = [];
  Category: string[] = [];
  Product: string[] = [];
  dt12 = 0;
  dt01 = 0;
  dt02 = 0;
  dt03 = 0;
  dt04 = 0;
  dt05 = 0;
  dt06 = 0;
  dt07 = 0;
  revenue: number;
  dailyRevenue: number;
  totalprice: number;
  dailyDate = moment().format('MMM D');

  constructor(
    public orderService: OrderService,
    public productService: ProductService,
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.orderService.refreshList();
    this.DeliveryTime();
    this.CategoryCount();
    
    this.DailyRevenue(this.dailyDate);
    console.log(this.dailyRevenue);

    this.WeeklyRevenue();
    
  }

  CategoryCount() {
    this.categoryService.returnCategory()
    .subscribe(category => {
      for( var c in category) {
          this.Category.push(category[c].CategoryName);
      } 
      
      this.productService.returnProduct()
      .subscribe(product => {
        for( var p in product) {
          this.Product.push(product[p].Category);
        } 

        for(var ca in this.Category) {
          this.CPcount =0;
          for(var po in this.Product) {
            if (this.Product[po] == this.Category[ca]){
              this.CPcount++;
            }
          }if (this.CPcount == 0){
            this.DataCP.push(null);
          }else {
            this.DataCP.push(this.CPcount);
          }
          this.CPChart(this.DataCP);
        }
      })
      
    })
    console.log(this.Category);
    console.log(this.DataCP);
    

  }

  DeliveryTime() {
    this.DataDT = [];
    this.orderService.getOrderMap()
    .subscribe( res => { 
      for(var i=0; i < Object.keys(res).length; i++) {
        this.deliveryTime.push(res[i].DeliveryTime)
      } 

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
  CPChart(data: any) {
    this.chart = new Chart('CPChart', {
      type: 'pie',
      data: {
         labels: this.Category,
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#6b8f23","#db4437","#f4b400","#4d90ff","#e69138","#c27ba0","#2e3d0f","#dd7e6b","#4d6619","#6b8f23","#8ab82d" ],
          data: data
        }]
      },
      options: {
        responsive: true,
        
        title: {
          // display: true,
          // text: 'Predicted world population (millions) in 2050'
        }
      }
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
        hover: {mode: null},
 
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

  WeeklyRevenue() {
    var WRLabel: string[] = [];
    var WRData: number[] = [];
    for(var i=7;i<0;i--) {
      var WRDate = moment().subtract(i, "days").format("MMM D");
      WRLabel.push(WRDate);
      this.DailyRevenue(WRDate);
      WRData.push(this.dailyRevenue);
    }
    console.log(WRDate);
    console.log(WRData);
    
  }

  DailyRevenue(date: string) {
    this.dailyRevenue = 0;
    this.orderService.returnOrder()
    .subscribe(orderData => {
      for( var o in orderData) {
        var res = orderData[o].PurchaseDate.split(", ");

        if(res[1] == date) {
          this.getRevenue(orderData[o].OrderId);
        }
      }
    })
  }

  getRevenue(id: number) {
    this.revenue = 0;
    this.totalprice = 0;
    this.orderService.returnOrderDetail()
    .subscribe(data => {
      for (var d in data) // for acts as a foreach  
      {  
        if(id == data[d].OrderId) {
          this.revenue += data[d].Revenue;
        }
      }
      this.dailyRevenue += this.revenue;

    })
  }
}
