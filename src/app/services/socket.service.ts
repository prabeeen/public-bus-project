import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  url:string = "http://192.168.1.3:3001" // <-- CHANGE / UPDATE THIS: Change to your IP address

  constructor() {
    this.socket = io(this.url)
   }

   listen(eventName: string){
    return new Observable(subscriber => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }

}
