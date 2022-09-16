import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router'
import { MapService } from 'src/app/services/map.service';

interface busDetails {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.scss']
})

export class SearchBusComponent implements OnInit, OnDestroy {

  routes:string[] = ['shantinagar','baneshwor','koteshwor','balkumari','gwarko',]
  searchForm!: FormGroup;

  filteredSourceRoutes$!: Observable<string[]>;
  filteredSourceRoutes!: string[];
  subSource!: Subscription;

  filteredDestinationRoutes$!: Observable<string[]>;
  filteredDestinationRoutes!: string[];
  subDestination!: Subscription;

  busDetail: busDetails[] = [
    {title: "Nepal Yatayat", description: "Bus Info", route:"a, b, c, d, e, f"},
    {title: "Mahanagar Yatayat", description: "Bus Info", route:"a, b, c, d, e, f"},
    {title: "Mayur Yatayat", description: "Bus Info", route:"a, b, c, d, e, f"},
    {title: "Ridhi Sidhi Yatayat", description: "Bus Info", route:"a, b, c, d, e, f"}
  ]

  toDisplayCard: boolean = false


  constructor(private router:Router, private mapService: MapService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      sourceControl : new FormControl('',[Validators.required]),
      destinationControl : new FormControl('',[Validators.required])
    });

    this.filteredSourceRoutes$ = this.searchForm.controls.sourceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredDestinationRoutes$ = this.searchForm.controls.destinationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


    this.subSource = this.filteredSourceRoutes$.subscribe(data=>{
      this.filteredSourceRoutes = data
    })

    this.subDestination = this.filteredDestinationRoutes$.subscribe(data=>{
      this.filteredDestinationRoutes = data
    })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.routes.filter(route => route.toLowerCase().startsWith(filterValue));
  }

  showCards(e:any){
    this.toDisplayCard = true;
  }

  startTracking(e:any, busTitle:string){
    this.router.navigate(['/passenger','trackbus'])
    this.mapService.trackBusType = busTitle;
    this.mapService.setBusTrackType(busTitle);
  }

  ngOnDestroy(): void {
    if(this.subSource)
    this.subSource.unsubscribe();
    if(this.subDestination)
    this.subDestination.unsubscribe();
  }

}

