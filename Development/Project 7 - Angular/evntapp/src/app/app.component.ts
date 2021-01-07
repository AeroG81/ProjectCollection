import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'evntapp';
  text = '';

  clicked(e:Object){
    console.log(e);
  }

  showText(e:Object){
    console.log('Hello '+e.target.value);
    console.log(e);
    console.log(this.text);
  }
}
