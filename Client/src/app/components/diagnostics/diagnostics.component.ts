import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/DataService/data-service.service';
import { NotificationService } from '../../services/notificationServices/notification.service';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.css']
})
export class DiagnosticsComponent implements OnInit {

  x: Label[];
  y=[];
  flowx: Label[];
  flowy=[];
  single: any[];
  flow : any[];

  oilx: Label[];
  oily=[];
  oil : any[];

  constructor(    private dataService : DataServiceService,
    private chatService : NotificationService
    ) {this.chatService.newMessageReceived()
      .subscribe(data=>this.ngOnInit());
}
joinChat(){
  const username = localStorage.getItem('odbId')
  this.chatService.joinRoom({user : "app" , room : username});

}
  ngOnInit() {
    this.loadChart();
    this.joinChat();
    this.loadFlowChart();
    this.loadOilChart();

  }
  loadChart(){

      this.dataService.fetchTime({odbId : localStorage.getItem('odbId')}).subscribe(data=>{
        if(data['sucess']){
          this.x=data['times'];
          this.dataService.fetchSpeed({odbId : localStorage.getItem('odbId')}).subscribe(data=>{
            if(data['sucess']){
              this.y=data['speeds'];
              var i ;
              var single =[];
              for (i = 0; i <this.x.length; i++) {
                single.push({
                  'name': this.x[i],
                  'value': this.y[i]
                })

              }

                  Object.assign(this, { single });
            }
          })
        }
      })

  }

  loadFlowChart(){

    this.dataService.fetchTime({odbId : localStorage.getItem('odbId')}).subscribe(data=>{
      if(data['sucess']){
        this.flowx=data['times'];
        this.dataService.fetchFlow({odbId : localStorage.getItem('odbId')}).subscribe(data=>{
          if(data['sucess']){
            this.flowy=data['flow'];
            var i ;
            var flow =[];
            for (i = 0; i <this.flowx.length; i++) {
              flow.push({
                'name': this.flowx[i],
                'value': this.flowy[i]
              })

            }

                Object.assign(this, { flow });
          }
        })
      }
    })

}

loadOilChart(){

  this.dataService.fetchTime({odbId : localStorage.getItem('odbId')}).subscribe(data=>{
    if(data['sucess']){
      this.oilx=data['times'];
      this.dataService.fetchOil({odbId : localStorage.getItem('odbId')}).subscribe(data=>{
        if(data['sucess']){
          this.oily=data['oil'];
          var i ;
          var oil =[];
          for (i = 0; i <this.oilx.length; i++) {
            oil.push({
              'name': this.oilx[i],
              'value': this.oily[i]
            })

          }

              Object.assign(this, { oil});
        }
      })
    }
  })

}
}
