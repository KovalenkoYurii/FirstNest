import { HttpService } from '@nestjs/common';
export declare class CurrencyService {
    private http;
    private readonly currencyUrl;
    constructor(http: HttpService);
    getCurrency(currencyCode: string): Promise<string>;
}
