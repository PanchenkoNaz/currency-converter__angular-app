import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Імпорт CommonModule для пайпів

@Component({
  selector: 'app-converter',
  standalone: true,
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  imports: [FormsModule, CommonModule]  // Додаємо FormsModule і CommonModule
})
export class ConverterComponent implements OnInit {

  currencies: string[] = ['UAH', 'USD', 'EUR'];
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  amount: number = 100;
  result: number = 0;
  exchangeRates: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Отримуємо курси валют з API
    this.http.get<any>('https://api.exchangerate-api.com/v4/latest/USD').subscribe(data => {
      this.exchangeRates = data.rates;
      this.convert();  // Викликаємо функцію конвертації для першого значення
    });
  }

  convert(): void {
    if (this.fromCurrency === 'USD') {
      this.result = this.amount * this.exchangeRates[this.toCurrency];
    } else if (this.toCurrency === 'USD') {
      this.result = this.amount / this.exchangeRates[this.fromCurrency];
    } else {
      const rate = this.exchangeRates[this.toCurrency] / this.exchangeRates[this.fromCurrency];
      this.result = this.amount * rate;
    }
  }
}
