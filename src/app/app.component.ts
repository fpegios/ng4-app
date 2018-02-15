import { Component } from '@angular/core';
import { MyserviceService } from './myservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 4 App';
  
  // declared array of months.
  months = ["January", "Feburary", "March", "April", "May", 
  "June", "July", "August", "September",
  "October", "November", "December"];

  isavailable = true;   //variable is set to true

  todaydate = new Date();
  jsonval = {name:'Rox', age:'25', address:{a1:'Mumbai', a2:'Karnataka'}};

  myClickFunction(event) {
    this.isavailable = false;
  }
  changemonths(event) {
    alert("Changed month from the Dropdown");
    console.log(event);
  }

  today;
  componentproperty;
  constructor(private myservice: MyserviceService) {}
  ngOnInit() {
    this.today = this.myservice.showTodayDate();
    console.log(this.myservice.serviceproperty);
    this.myservice.serviceproperty = "component created"; // value is changed.
    this.componentproperty = this.myservice.serviceproperty;
  }
}
