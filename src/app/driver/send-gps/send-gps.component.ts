import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-send-gps',
  templateUrl: './send-gps.component.html',
  styleUrls: ['./send-gps.component.scss']
})
export class SendGPSComponent implements OnInit {
  checkGPSAvailability: boolean = false;
  coordLocation: number[][] = [
    [85.3455312249796, 27.68839297956019],
    [85.3454722034756, 27.688447617949592],
    [85.34532464971812, 27.688535514430285],
    [85.34520392391579, 27.688621035262756],
    [85.34515831638993, 27.688651917769093],
    [85.34481223575767, 27.688875221786674],
    [85.34487930564802, 27.688984498053983],
    [85.34510197767929, 27.689062891830417],
    [85.34527635939361, 27.689119905451264],
    [85.3454346443371, 27.689117529882907],
    [85.34578340776562, 27.68910090091309],
    [85.34615899915099, 27.689053389556676],
    [85.34612412280813, 27.689072394101444],
    [85.34634411204667, 27.689010629317792],
    [85.34638167118544, 27.68898924919219],
    [85.34664190235912, 27.6888633439237]
  ];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    if(navigator.geolocation){
      this.checkGPSAvailability = true;
    }
    else{
      this.checkGPSAvailability = false;
    }
    let i = 0;
    let timeInterval = setInterval(()=>{
      if(i === this.coordLocation.length){
        clearInterval(timeInterval)
        return
      }
      this.socketService.emit('sendGPS', this.coordLocation[i])
      console.log(this.coordLocation[i]);
      i++;
    }, 1000);

  }

}
