
export class InterestRates{
  private _obowiazuje_od: string
  private _oprocentowanie: number

  constructor() {
    this._obowiazuje_od = ""
    this._oprocentowanie = 0
  }

  set obowiazuje_od(value: string) {
    this._obowiazuje_od = value;
  }


  set oprocentowanie(value: number) {
    this._oprocentowanie = value;
  }

  get obowiazuje_od(): string {
    return this._obowiazuje_od;
  }


  get oprocentowanie(): number {
    return this._oprocentowanie;
  }
}
