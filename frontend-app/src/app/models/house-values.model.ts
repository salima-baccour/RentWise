
export class HouseValues{
  private _quarter: string
  private _price: number


  constructor() {
    this._quarter = ""
    this._price = 0
  }


  get quarter(): string {
    return this._quarter;
  }


  set quarter(value: string) {
    this._quarter = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
