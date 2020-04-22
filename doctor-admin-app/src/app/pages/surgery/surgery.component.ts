import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPApiService } from 'src/app/shared/api/sp-api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

interface Surgery {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.scss']
})
export class SurgeryComponent implements OnInit {

  currentSP: ServiceProvider = null;
  spSearchForm = new FormControl();
  allSPs: ServiceProvider[] =  [];
  filteredSPs: Observable<ServiceProvider[]>;
  selected: string = '';

  surgeries: Surgery[] = [
    {value: 'colonoscopy-0', viewValue: 'Colonoscopy'},
    {value: 'ogd-1', viewValue: 'OGD'},
    {value: 'mac-2', viewValue: 'MAC'}
  ];

  constructor( private spApiService: SPApiService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getAllServiceProviders();
    this.filteredSPs = this.spSearchForm.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  getAllServiceProviders(){
    this.spApiService.getAll().subscribe(
      data => {
        this.allSPs = data;
      }
    )
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.allSPs.filter(
      selectedSP => selectedSP.name.toLowerCase().includes(filterValue) || 
      selectedSP.id.toString().includes(filterValue))
  }

  onSubmit(){
    for(var i = 0; i < this.allSPs.length; i++){
      if(this.allSPs[i].name ===  this.spSearchForm.value){
        this.currentSP = this.allSPs[i];
      }
    }
  }
}
