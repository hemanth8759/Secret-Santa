import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  username;
  firstname;
  lastname;
  email;
  password;

  sendData() {
    var username = this.username;
    var firstname = this.firstname;
    var lastname = this.lastname;
    var email = this.email;
    var password = this.password;
    var jsonData = { username, firstname, lastname, email, password }


    this.http.post("http://localhost:3000/register",jsonData)
      .subscribe(
        (err) => {
          if (err) console.log(err);
          console.log("Success");
        });
  }

}
