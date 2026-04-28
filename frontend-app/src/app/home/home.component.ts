import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {DrawChartComponent} from "../draw-chart/draw-chart.component";
import {SearchOptionsComponent} from "../search-options/search-options.component";
import {DataTableComponent} from "../data-table/data-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavComponent,
    DrawChartComponent,
    SearchOptionsComponent,
    DataTableComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

}
