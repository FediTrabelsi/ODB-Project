import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { NotificationService } from '../../services/notificationServices/notification.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private chatService : NotificationService,
    private _router : Router
  ) { }

  ngOnInit() {
    this.joinChat();
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('notifications');
    localStorage.removeItem('odbId');
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }

  joinChat(){
    const username = localStorage.getItem('odbId')
    this.chatService.joinRoom({user : "app" , room : username});

  }

}
