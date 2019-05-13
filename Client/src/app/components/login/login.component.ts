import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username="";
  password="" ;
  loginStatus="";
  constructor(
    private authService : AuthService,
    private _router : Router
  ) { }

  ngOnInit() {
  }

  Login(){
    const data={
      username : this.username,
      password : this.password
    }
    this.authService.signUser(data).subscribe(data =>{
      this.loginStatus=data['message'];
      if(data['success']){
        localStorage.setItem("odbId",data['user'].odbId)
      setTimeout(()=>{
        this._router.navigate(['home']);

      },2000);
    }
      console.log(data);
    })
  }

}
