import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class TransferGpsService {
  timeInterval:any;
  wakeLock:any;
  gpsId: number = 0;

  coordLocation: number[][] = [
    [
      85.34218991268614,
      27.686747988111193
    ],
    [
      85.34201001860293,
      27.686521296829383
    ],
    [
      85.3419062335559,
      27.686331365934123
    ],
    [
      85.3417540154868,
      27.68620882969779
    ],
    [
      85.34160871642075,
      27.686025025084746
    ],
    [
      85.34136655130925,
      27.685920868999787
    ],
    [
      85.34117973822293,
      27.685755444425666
    ],
    [
      85.34094449211614,
      27.685473609389433
    ],
    [
      85.34074384102348,
      27.685210154240494
    ],
    [
      85.34043940488522,
      27.684879302688415
    ],
    [
      85.3403148628272,
      27.684769018615384
    ],
    [
      85.33996199366698,
      27.684879302688415
    ],
    [
      85.3395399344738,
      27.685075362988286
    ],
    [
      85.3391455512932,
      27.685210154240494
    ],
    [
      85.33913863229003,
      27.68529593040553
    ],
    [
      85.33896565721,
      27.685491989957356
    ],
    [
      85.33853667901366,
      27.68562065384657
    ],
    [
      85.3381007818142,
      27.685694176001576
    ],
    [
      85.33830143290533,
      27.68768538219635
    ],
    [
      85.34219683168931,
      27.686747988111193
    ]
  ]

  constructor(private socketService: SocketService) {}

  checkWakeLock(){
    if('wakeLock' in navigator) return true;
    return false;
  }

  async acquireLock(wakeLockToggler:any){
    const anyNav: any = navigator;
    this.wakeLock = await anyNav["wakeLock"].request("screen");

    this.wakeLock.addEventListener('release',()=>{
      wakeLockToggler.checked=false;
    })
  }

  releaseLock(){
    this.wakeLock.release().then(()=>{
      console.log("wake lock released");
    })
  }

  checkGPS(){
    if(navigator.geolocation){
      return true;
    }
    return false;
  }

  getName(){
    const name = "ram";
    return name;
  }

  getBusType(){
    const busType = "Mayur Yatayat";
    return busType;
  }

  getId(){
    const id = prompt(" Id: ");
    return id;
  }

  sendNewDriver(driverData:{name:string, busType: string, id:string}){
    this.socketService.emit('new-driver', driverData);
  }

  noGPS(){
    clearInterval(this.timeInterval);
    // navigator.geolocation.clearWatch(this.gpsId);
    this.socketService.emit('leave-room', '');
  }

  sendGPS(gpsToggler:any){

    let i = 0;
    this.timeInterval = setInterval(()=>{
      if(i === this.coordLocation.length){
        clearInterval(this.timeInterval)
        return
      }
      this.socketService.emit('sendGPS', this.coordLocation[i])
      i++;
    }, 3000);

    // this.gpsId = navigator.geolocation.watchPosition(data=>{
    //   const coordLocation:[number,number] = [data.coords.longitude,data.coords.latitude]
    //   this.socketService.emit('sendGPS', coordLocation)
    // },
    // error =>{
    //   console.log(error);
    //   alert(error.message);
    //   gpsToggler.checked = false;
    // },
    // {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // })
  }


}
