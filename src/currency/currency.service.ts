import { Injectable, HttpService } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { stringify } from 'querystring';

@Injectable()
export class CurrencyService {
  private readonly currencyUrl: string;
  private readonly tableMap: Map<number, string>;
  constructor() {
    this.currencyUrl =
      'https://credit-agricole.ua/en/privatnym-kliyentam/operaciyi-z-inozemnoyu-valyutoyu';
    this.tableMap = new Map()
      .set(0, 'Purchase')
      .set(1, 'Selling')
      .set(2, 'NBU');
  }

  public async getCurrency(currencyCode: string) {
    const rate = await this.getCurrencyRate(currencyCode);
    const currency =
      rate.get(currencyCode.toUpperCase()) || 'wrong currency code';
    return currency;
  }

  private async getCurrencyRate(currencyCode: string) {
    const {
      window: { document },
    } = await JSDOM.fromURL(this.currencyUrl, {
      resources: 'usable',
      runScripts: 'dangerously',
    });
    const currencyTable = Array.from(document.querySelectorAll('.currency'));
    const rate: ReadonlyArray<[string, string]> = currencyTable.map(el => {
      const unFormattedRow = el.textContent.split(/\s+/g).splice(1, 4);
      const [key, ...rates] = unFormattedRow;
      const formattedRates = rates
        .map((value, idx) => `${this.tableMap.get(idx)}: ${value}`)
        .join(', ');
      return [key, formattedRates];
    });
    return new Map(rate);
  }
}
