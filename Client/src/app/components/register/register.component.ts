import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = "";
  password = "";
  passwordconf ="";
  odb="";
  registerStatus;
  constructor(
    private authService : AuthService,
    private _router : Router
  ) { }

  ngOnInit() {
  }

  Register(){
    const data = {
      username : this.username,
      password : this.password,
      passwordconf : this.passwordconf,
      odbId :  this.odb
    }
    this.authService.registerUser(data).subscribe(data=>{
      this.registerStatus=data['message'];
      setTimeout(()=>{
        this._router.navigate(['home']);

      },2000);
    })
     }

}
