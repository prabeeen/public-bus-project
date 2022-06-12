import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isDown: boolean = false;
  startX: number = 0;
  scrollLeft: any;
  

  constructor() { }

  ngOnInit(): void {
  }

  actionOnMouseDown(e: any){
    this.isDown = true;
    this.startX = e.pageX - e.target.offsetLeft;
    this.scrollLeft = e.target.scrollLeft;
    e.target.style.cursor = "grabbing";
  }

  actionOnMouseLeave(e: any){
    this.isDown = false;
  }

  actionOnMouseUp(e: any){
    this.isDown = false;
    e.target.style.cursor = "grab";
  }

  actionOnMouseMove(e: any){
    if(!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - e.target.offsetLeft;
    const walk = (x-this.startX)*1.2;
    e.target.scrollLeft = this.scrollLeft - walk;
  }

  actionOnMouseEnter(e: any){
    e.target.style.cursor = "grab";
  }

}
