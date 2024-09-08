import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  standalone: true,
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class ConverterComponent implements OnInit {

  currencies: string[] = ['UAH', 'USD', 'EUR', 'GBP', 'CAD', 'JPY'];  // Додані валюти
  fromCurrency: string = 'USD';  // Перша валюта
  toCurrency: string = 'EUR';  // Друга валюта
  amount: number = 100;  // Значення для першої валюти
  result: number = 0;  // Значення для другої валюти
  exchangeRates: any = {};  // Курси валют

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRates();  // Отримуємо курси валют при ініціалізації
  }

  // Функція для отримання курсів валют
  fetchRates(): void {
    this.http.get<any>('https://api.exchangerate-api.com/v4/latest/USD').subscribe(data => {
      this.exchangeRates = data.rates;
      this.convertFromFirstCurrency();  // Конвертуємо початкові значення
    });
  }

  // Конвертація значень при зміні першої валюти
  convertFromFirstCurrency(): void {
    if (this.fromCurrency === this.toCurrency) {
      this.result = this.amount;
    } else {
      const rate = this.exchangeRates[this.toCurrency] / this.exchangeRates[this.fromCurrency];
      this.result = this.amount * rate;
    }
  }

  // Конвертація значень при зміні другої валюти
  convertFromSecondCurrency(): void {
    if (this.fromCurrency === this.toCurrency) {
      this.amount = this.result;
    } else {
      const rate = this.exchangeRates[this.fromCurrency] / this.exchangeRates[this.toCurrency];
      this.amount = this.result * rate;
    }
  }

  // Оновлення курсів і конвертація при зміні валюти
  onCurrencyChange(): void {
    this.convertFromFirstCurrency();  // Оновлюємо значення для першої валюти
  }

  // Оновлення курсів і конвертація при зміні валюти
  onSecondCurrencyChange(): void {
    this.convertFromSecondCurrency();  // Оновлюємо значення для другої валюти
  }
}
