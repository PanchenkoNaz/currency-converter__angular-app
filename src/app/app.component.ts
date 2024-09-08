import { Component } from '@angular/core';
import { ConverterComponent } from './components/converter/converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ConverterComponent]
})
export class AppComponent {
}

