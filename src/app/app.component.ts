import { Component } from '@angular/core';
import { MyserviceService } from './myservice.service';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import 'rxjs/add/operator/map';

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

  constructor(private myservice: MyserviceService, private http: Http) {}

  httpdata;
  searchparam = 2;
  jsondata;
  name;

  emailid;
  formdata;

  ngOnInit() {
    this.today = this.myservice.showTodayDate();
    console.log(this.myservice.serviceproperty);
    this.myservice.serviceproperty = "component created"; // value is changed.
    this.componentproperty = this.myservice.serviceproperty;

    this.http.get("http://jsonplaceholder.typicode.com/users?id=" + this.searchparam).
    map(
      (response: Response) => response.json()
    ).
    subscribe(
      ((data) => this.converttoarray(data))
    )

    // Model Driven Form
    this.formdata = new FormGroup({
      emailid: new FormControl("", Validators.compose([
         Validators.required,
         Validators.pattern("[^ @]*@[^ @]*")
      ])),
      passwd: new FormControl("", this.passwordvalidation)
    });
  }

  converttoarray(data) {
    console.log(data);
    this.name = data[0].name;
  }  

  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 5) {
       return {"passwd" : true};
    }
 }

  onClickSubmit(data) {this.emailid = data.emailid;}
}
