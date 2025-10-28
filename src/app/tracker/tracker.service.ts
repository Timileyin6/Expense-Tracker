import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  private http = inject(HttpClient)

  private currentCurrency$ = new BehaviorSubject<string>('USD');
  private rates : Record<string, number> = {USD : 1};
  private availableCurrencies$ = new BehaviorSubject<Record<string, string>>({});

  constructor() {
    this.fetchAvailableCurrencies();
    this.fetchRates()
   }

  public fetchAvailableCurrencies(){
    this.http.get<Record<string, string>>('https://api.frankfurter.app/currencies').subscribe({
      next: (res)=> this.availableCurrencies$.next(res),
      error: (err : any)=>{console.error('Error fetching currencies', err);
            }
    })
  }

  public getAvailableCurrencies(){
    return this.availableCurrencies$.asObservable();
  }

  fetchRates(){
    this.http.get<Record<string, number>>('https://api.frankfurter.app/latest?from=USD').subscribe({
      next: (res : any)=> {this.rates = {USD: 1, ...res.rates}},
      error: (err: any) => {console.error('Error fetching rates', err);}
    })
  }

  setCurrency(currency: string){
    this.currentCurrency$.next(currency);
  }

  getCurrency(){
    return this.currentCurrency$.asObservable();
  }

  getActiveCurrency(){
    return this.currentCurrency$.value;
  }

  convert(amount: number, from = 'USD', to = this.currentCurrency$.value): number {
    if (!this.rates[from] || !this.rates[to]) return amount;
    const inUSD = amount / this.rates[from];
    return inUSD * this.rates[to];
  }
}
