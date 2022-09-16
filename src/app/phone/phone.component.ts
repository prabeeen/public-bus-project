import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  constructor(private _bottomSheetRef: MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  openLink(e:any){
    this._bottomSheetRef.dismiss();
  }
}
