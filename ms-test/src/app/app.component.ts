import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public groups :any = [{"name": "pencils", "items": ["red pencil","blue pencil","yellow pencil"]},{"name": "rubbers", "items": ["big rubber","small rubber"]}];
}
