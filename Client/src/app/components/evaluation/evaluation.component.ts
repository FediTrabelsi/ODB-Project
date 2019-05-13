import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { DataServiceService } from '../../services/DataService/data-service.service';
import { NotificationService } from '../../services/notificationServices/notification.service';
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  engineTemp = 195;
  fuelLevel=13;
  speed =80 ;
  consp = 10;
  rpm = 1200;
  oilTempe=250;
  co2= 13;
  air=14;
  circleRadius:number = 100;

  bat=13;
 public map: any = { lat: 35.820457, lng: 10.593096 };
 
  test(x,y){
    var x1=+x;
    return(x1<y);
  }
  
  zoom: number = 8;
    data;
  constructor(
    private dataService : DataServiceService,
    private chatService : NotificationService
  ) {

    this.chatService.newMessageReceived()
    .subscribe(data=>this.ngOnInit());
  }
  ngOnInit() {
    this.joinChat();
    this.loadData();
  }

     joinChat(){
    const username = localStorage.getItem('odbId')
    this.chatService.joinRoom({user : "app" , room : username});

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

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}


  

