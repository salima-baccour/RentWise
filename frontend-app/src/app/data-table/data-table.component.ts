import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../services/backend.service";
import {Subscription} from "rxjs";
import {AllHouseValues} from "../models/all-house-values.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit, OnDestroy{

  allHouseValues: AllHouseValues [] = []

  dataSubscription!: Subscription

  housePrices = []

  columnsNames = ['Bialystok', 'Bydgoszcz', 'Gdansk', 'Gdynia', 'Katowice', 'Kielce', 'Krakow', 'Lublin', 'Lodz', 'Olsztyn', 'Opole', 'Poznan', 'Rzeszow','Szczecin','Warszawa','Wroclaw','Zielona Gora','7 miast','10 miast','6 miast bez Warszawy', '9 miast']
  quarters: string [] = []

  constructor(private backendService: BackendService) {
  }
  ngOnInit() {
    this.allHouseValues = []
    this.dataSubscription = this.backendService.allHousePricesChange.subscribe((data: any)=>{
      this.allHouseValues = data
    })
  }

  getQuarterName(dateString: string): string {
    const date = new Date(dateString);
    const quarter = Math.floor((date.getMonth() + 3) / 3);
    let quarterRoman = ""
    switch (quarter){
      case 1:
        quarterRoman = "I"
        break
      case 2:
        quarterRoman = "II"
        break
      case 3:
        quarterRoman = "III"
        break
      case 4:
        quarterRoman = "IV"
        break
    }

    const year = date.getFullYear();
    return `${quarterRoman} ${year}`;
  }

  downloadJSONFile() {
    const json = JSON.stringify(this.allHouseValues, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  downloadXMLFile() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';

    for (const houseValue of this.allHouseValues) {
      xml += `\t<AllHouseValues>\n`;
      xml += `\t\t<quarter>${houseValue.quarter.slice(0, 10)}</quarter>\n`;

      for (const [city, price] of Object.entries(houseValue.prices)) {
        xml += `\t\t<${city}>${price}</${city}>\n`;
      }

      xml += `\t</AllHouseValues>\n`;
    }

    xml += '</data>';

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xml';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe()
  }
}
