import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";

import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels
} from "ng-apexcharts";

import {BackendService} from "../services/backend.service";
import {InterestRates} from "../models/interest-rates.model";
import {Subscription} from "rxjs";
import {HouseValues} from "../models/house-values.model";
import {CommonModule} from "@angular/common";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-draw-chart',
  standalone: true,
  imports: [
    NgApexchartsModule,
    CommonModule
  ],
  templateUrl: './draw-chart.component.html',
  styleUrl: './draw-chart.component.scss'
})

export class DrawChartComponent implements OnInit, OnDestroy{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  dataSubscription!: Subscription


  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.dataSubscription = this.backendService.dataChange.subscribe( (data)=>{
      const temp1 = this.setHousePrices(data.houseValues1, data.houseValues2)
      const temp2 = this.setInterestValuesAndDates(data.interestRates, data.houseValues1)
      this.initializeChart(temp1.housePrices, temp1.housePrices2, temp2.interestValues, temp2.interestDates, data.cityName1, data.cityName2, data.citiesNumber)
    })
    this.initializeChart([],[],[],[], "", "", 1)
  }

  setInterestValuesAndDates(interestRates: InterestRates[], houseValues: HouseValues[]) {
    let interestDates: string[] = []
    let interestValues: number[] = []
    const housePeriods = houseValues.map(item => item.quarter.split("T")[0]);
    interestRates.forEach((item: InterestRates) => {
      if (housePeriods.includes(item.obowiazuje_od)) {
        interestValues.push(item.oprocentowanie);
        interestDates.push(this.formatToQuarter(item.obowiazuje_od));
      }
    });
    return {interestDates: interestDates, interestValues: interestValues}
  }

  formatToQuarter(dateStr: string) {
    const [year, month] = dateStr.split("-");
    const monthInt = parseInt(month, 10);
    let quarter;

    if (monthInt >= 1 && monthInt <= 3) {
      quarter = 'I';
    } else if (monthInt >= 4 && monthInt <= 6) {
      quarter = 'II';
    } else if (monthInt >= 7 && monthInt <= 9) {
      quarter = 'III';
    } else if (monthInt >= 10 && monthInt <= 12) {
      quarter = 'IV';
    }

    return `${quarter} ${year}`;
  }

  setHousePrices(houseValues1: HouseValues[], houseValues2: HouseValues[]){
    let housePrices: number[] = []
    let housePrices2: number[] = []

    houseValues1.forEach(( item) => {
      housePrices.push(item.price)
    })

    houseValues2.forEach(( item: HouseValues) => {
      housePrices2.push(item.price)
    })

    return {housePrices: housePrices, housePrices2: housePrices2}
  }

  initializeChart(housePrices1: number[], housePrices2: number[], interestValues: number[], interestDates: string[], cityName1: string, cityName2: string, citiesNumber: number) {
    if(citiesNumber == 1){
      this.chartOptions = {
        series: [
          {
            name: cityName1,
            type: "column",
            data: housePrices1
          },
          {
            name: "stopy procentowe",
            type: "line",
            data: interestValues
          }
        ],
        chart: {
          height: 450,
          type: "line"
        },
        stroke: {
          width: [0, 4]
        },
        title: {
          text: "Ceny miszkań w "+cityName1
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        labels: interestDates,
        xaxis: {
          categories: interestDates
        },
        yaxis: [
          {
            title: {
              text: cityName1+" zł / m^2"
            }
          },
          {
            opposite: true,
            title: {
              text: " stopy procentowe %"
            },
            min: 0
          }
        ],
        tooltip: {
          enabled: true
        }
      };
    } else {
      this.chartOptions = {
        series: [
          {
            name: cityName1,
            type: "column",
            data: housePrices1
          },
          {
            name: cityName2,
            type: "column",
            data: housePrices2
          },
          {
            name: "stopu procentowe",
            type: "line",
            data: interestValues
          }
        ],
        chart: {
          height: 450,
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: "Porównanie cen miszkań "+cityName1+" "+cityName2,
          align: "left",
          offsetX: 110
        },
        xaxis: {
          categories: interestDates
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#008FFB"
            },
            labels: {
              style: {
                color: "#008FFB"
              }
            },
            title: {
              text: cityName1+" zł / m^2",
              style: {
                color: "#008FFB"
              }
            },
          },
          {
            seriesName: "Ceny miszkań",
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#00E396"
            },
            labels: {
              style: {
                color: "#00E396"
              }
            },
            title: {
              text: cityName2+" zł/m^2",
              style: {
                color: "#00E396"
              }
            }
          },
          {
            seriesName: "stopy procentowe",
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#FEB019"
            },
            labels: {
              style: {
                color: "#FEB019"
              }
            },
            title: {
              text: "stopy procentowe %",
              style: {
                color: "#FEB019"
              }
            },
            min: 0
          }
        ],
        tooltip: {
          enabled: true
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40
        }
      };
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe()
  }
}