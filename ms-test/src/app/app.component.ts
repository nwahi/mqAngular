import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public groups :any = [
    {
      "initialMargins": 
        [
          {exchange:"CCL",currency:"USD",imNumber:"701,372.00",imInBase:"701,372.00"}
          ,{exchange:"SFE",currency:"AUD",imNumber:"296,400.00",imInBase:"212,770.74"}
          ,{exchange:"MON",currency:"CAD",imNumber:"86,903.00",imInBase:"66,910.22"}
          ,{exchange:"ERX",currency:"EUR",imNumber:"732,967.00",imInBase:"852,588.02"}
          ,{exchange:"JSC",currency:"JPY",imNumber:"780,000.00",imInBase:"7,012.18"}
        ]
    }
  ]
}