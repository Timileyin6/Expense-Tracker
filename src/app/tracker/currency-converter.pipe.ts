// import { Pipe, PipeTransform } from '@angular/core';
// import { TrackerService } from './tracker.service';

// @Pipe({
//   name: 'currencyConverter',
//   pure: false 
// })
 
// export class ConvertCurrencyPipe implements PipeTransform {
//   currentCurrency = 'USD';

//   constructor(private trackerService: TrackerService) {
//     this.trackerService.getCurrency().subscribe(curr => {
//       this.currentCurrency = curr;
//     });
//   }

//   transform(value: number, from: string = 'USD'): string {
//     const converted = this.trackerService.convert(value, from, this.currentCurrency);
//     return `${this.currentCurrency} ${converted.toFixed(2)}`;
//   }
// }


import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { TrackerService } from './tracker.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'currencyConverter',
  pure: false
})
export class ConvertCurrencyPipe implements PipeTransform {
  private currentCurrency = 'USD';
  private subscription: Subscription | null = null;

  constructor(
    private trackerService: TrackerService,
    private cdr: ChangeDetectorRef
  ) {}

  transform(value: number, from: string = 'USD'): number {
  if (!this.subscription) {
    this.subscription = this.trackerService.getCurrency().subscribe(curr => {
      this.currentCurrency = curr;
      this.cdr.markForCheck();
    });
  }

  const converted = this.trackerService.convert(value, from, this.currentCurrency);
  return converted; // ✅ return number, not string
}


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

