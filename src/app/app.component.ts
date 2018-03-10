import { Component } from '@angular/core';
import { MyserviceService } from './myservice.service';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles:[`
      div{
         margin: 0 auto;
         text-align: center;
         width:200px;
      }
      .rotate{
         width:100px;
         height:100px;
         border:solid 1px red;
      }
   `],
   animations: [
      trigger('myanimation',[
         state('smaller',style({
            transform : 'translateY(100px)'
         })),
         state('larger',style({
            transform : 'translateY(0px)'
         })),
         transition('smaller <=> larger',animate('300ms ease-in'))
      ])
   ]
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

  // FORMS
  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 5) {
       return {"passwd" : true};
    }
  }

  

  onClickSubmit(data) {this.emailid = data.emailid;}

  // ANIMATIONS
  state: string = "smaller";
  animate() {
    this.state= this.state == 'larger' ? 'smaller' : 'larger';
  }
}
