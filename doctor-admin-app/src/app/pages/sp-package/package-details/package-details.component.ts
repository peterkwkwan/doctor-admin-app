import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPApiService } from 'src/app/shared/api/sp-api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SPPackage } from 'src/app/shared/api/sp-package-model';
import { SPPackageApiService } from 'src/app/shared/api/sp-package-api.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit {

  currentPackage: SPPackage = null;
  serviceProviders: ServiceProvider[] = [];
  spSearchForm = new FormControl();
  allSPs: ServiceProvider[] =  [];
  filteredSPs: Observable<ServiceProvider[]>;

  constructor( private spApiService: SPApiService,
    private packageApiService: SPPackageApiService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getPackage(this.route.snapshot.paramMap.get('id'));
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

  getPackage(id) {
    this.packageApiService.getById(id)
      .subscribe(
        data => {
          this.currentPackage = data;
          console.log(this.currentPackage);
          this.getServiceProviders();
        },
        error => {
          console.log(error);
        });
  }

  getServiceProviders() {
    for(var i = 0; i < this.currentPackage.service_providers.length; i++){
      this.spApiService.getById(this.currentPackage.service_providers[i].id).subscribe(
        (data: ServiceProvider) => {
          this.serviceProviders.push(data);
        }
      ) 
    }
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.allSPs.filter(
      selectedSP => selectedSP.name.toLowerCase().includes(filterValue) || 
      selectedSP.id.toString().includes(filterValue))
  }

  remove(id){
    for(var i = 0; i < this.serviceProviders.length; i ++){
      if(this.serviceProviders[i].id === id){
        this.serviceProviders.splice(i, 1);
      }
    }
  }

  onSubmit(){
    for(var i = 0; i < this.allSPs.length; i++){
      if(this.allSPs[i].name ===  this.spSearchForm.value){
        this.serviceProviders.push(this.allSPs[i])
      }
    }
  }

}
