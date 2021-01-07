import { Component } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class ProfileComponent {
  title = 'myapp';
  person = {
    name: "wh",
    age: 18,
    address: {
      street: '300, Jalan Apa',
      city: "Seremban",
      state: "Negeri Sembilan"
    },
    friends: [
      {name: "Peter", age: 22},
      {name: "Sandy", age: 21},
      {name: "Madeline", age: 20},
    ]
  }

  constructor(){
    this.title = 'User Profile'
  }
}
