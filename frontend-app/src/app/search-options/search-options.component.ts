import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-search-options',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './search-options.component.html',
  styleUrl: './search-options.component.scss'
})

export class SearchOptionsComponent implements OnInit {
  searchForm!: FormGroup;
  city1: string = "Bialystok"
  city2: string = "Brak"
  marketType: string = ""
  offerType: string = ""
  startDate: string = ""
  endDate: string = ""

  cities = ['Bialystok', 'Bydgoszcz', 'Gdansk', 'Gdynia', 'Katowice', 'Kielce', 'Krakow', 'Lublin', 'Lodz', 'Olsztyn', 'Opole', 'Poznan', 'Rzeszow','Szczecin','Warszawa','Wroclaw','Zielona Gora','7 miast','10 miast','6 miast bez Warszawy', '9 miast']
  citiesOptional = ['Brak','Bialystok', 'Bydgoszcz', 'Gdansk', 'Gdynia', 'Katowice', 'Kielce', 'Krakow', 'Lublin', 'Lodz', 'Olsztyn', 'Opole', 'Poznan', 'Rzeszow','Szczecin','Warszawa','Wroclaw','Zielona Gora','7 miast','10 miast','6 miast bez Warszawy', '9 miast']

  marketTypes = ['rynek wtorny', 'rynek pierwotny']
  offerTypes = ['ceny transakcyjne', 'ceny ofertowe']

  minDate: string = "2006-07-01";
  maxDate: string = "2023-10-01";

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      'cities': new FormControl(this.city1,Validators.required),
      'cities2': new FormControl(this.city2),
      'marketType': new FormControl("rynek pierwotny", Validators.required),
      'offerType': new FormControl("ceny ofertowe", Validators.required),
      'start_date': new FormControl("2010-01-01"),
      'end_date': new FormControl("2021-01-01")
    })
  }

  async onSubmit(){

    this.city1 = this.searchForm.value.cities ? this.searchForm.value.cities : '';

    this.city2 = this.searchForm.value.cities2 ? this.searchForm.value.cities2 : '';

    if(this.searchForm.value.marketType == "rynek pierwotny") this.marketType = "rynek_pierwotny"
    else if(this.searchForm.value.marketType == "rynek wtorny") this.marketType = "rynek_wtorny"
    else this.marketType = ""

    if(this.searchForm.value.offerType == "ceny ofertowe") this.offerType = "ceny_ofertowe"
    else if(this.searchForm.value.offerType == "ceny transakcyjne") this.offerType = "ceny_transakcyjne"
    else this.offerType = ""

    this.startDate = this.searchForm.value.start_date ? this.searchForm.value.start_date : '';
    this.endDate = this.searchForm.value.end_date ? this.searchForm.value.end_date : '';

    await this.backendService.loadData(this.city1, this.city2, this.marketType, this.offerType, this.startDate, this.endDate)

    await this.backendService.getAllData(this.marketType,this.offerType, this.startDate, this.endDate)
  }
}
