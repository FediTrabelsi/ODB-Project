import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/DataService/data-service.service';
import { NotificationService } from '../../services/notificationServices/notification.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  data;
  constructor(
    private dataService : DataServiceService,
    private chatService : NotificationService
  ) {

    this.chatService.newMessageReceived()
    .subscribe(data=>this.ngOnInit());
  }

  joinChat(){
    const username = localStorage.getItem('odbId')
    this.chatService.joinRoom({user : "app" , room : username});

  }
  ngOnInit() {
    this.joinChat();
    this.loadData();
  }

  loadData(){
    const data={
      odbId : localStorage.getItem('odbId')
    }
    this.dataService.fetchData(data).subscribe(res=>{
      if(res['sucess']){
      this.data=res['data']
      }
      console.log(res)
    })
  }

}
