
export class AllHouseValues{
  private _quarter: string
  private _prices: number[]


  constructor() {
    this._quarter = ""
    this._prices = []
  }

  get quarter(): string {
    return this._quarter;
  }

  set quarter(value: string) {
    this._quarter = value;
  }

  get prices(): number[] {
    return this._prices;
  }

  set prices(value: number[]) {
    this._prices = value;
  }
}
