import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  email: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  login() : void {
    if(this.username != null && this.password != null && this.email != null){
      let user_data = {
        "username": this.username,
        "password": this.password,
        "email": this.email
      }
      this.dataService.logincall(user_data);
    }else{
      alert('Invalid Credentials');
    } 
  }

}
