import { Injectable, HttpService } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export class CurrencyService {
  private readonly currencyUrl: string;
  constructor(private http: HttpService) {
    this.currencyUrl = 'https://client-bank.privatbank.ua/p24/login';
  }

  public async getCurrency(currencyCode: string) {
    const {
      window: { document },
    } = await JSDOM.fromURL(this.currencyUrl, {
      resources: 'usable',
      runScripts: 'dangerously',
    });
    const currency =
      document.querySelector(`.${currencyCode}_box`).textContent || '';
    setInterval(
// tslint:disable-next-line: no-console
      console.log.bind(
        null,
        document.querySelector(`.${currencyCode}_box`).textContent,
      ),
      1000,
    );
    return currency.replace(/\s/g, '');
  }
}
