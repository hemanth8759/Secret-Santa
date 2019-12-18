import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  email;
  password;

  udata;

  login() {
    var email = this.email;
    var password = this.password;
    var jsonLoginData = { email, password };

    this.http.post("http://localhost:3000/login", jsonLoginData).subscribe(
      (data) => {
        this.router.navigate(['/dashboard']);     //navigating to ur dashboard(*important)

        if ( jsonLoginData.email=="batman6547@gmail.com"){
           this.router.navigate(['/admindashboard']);  
        }
      }, (err) => {
        alert("Sorry dude")
      });
  }

}
