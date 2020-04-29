import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';
import { SPApiService } from 'src/app/shared/api/sp-api.service';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from 'src/app/shared/api/clinic-model';
import { SPPackageApiService } from 'src/app/shared/api/sp-package-api.service';
import { SPPackage } from 'src/app/shared/api/sp-package-model';

@Component({
  selector: 'app-sp-details',
  templateUrl: './sp-details.component.html',
  styleUrls: ['./sp-details.component.scss']
})
export class SpDetailsComponent implements OnInit {

  currentSP: ServiceProvider = null;
  clinics: Clinic[] = [];
  packages: SPPackage[] = [];
  selected = 'None';

  constructor( private clinicApiService: ClinicApiService,
    private spApiService: SPApiService,
    private packageApiService: SPPackageApiService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getSP(this.route.snapshot.paramMap.get('id'));
  }

  getSP(id) {
    this.spApiService.getById(id)
      .subscribe(
        (data: ServiceProvider) => {
          this.currentSP = data;
          this.getPackages();
        },
        error => {
          console.log(error);
        });
  }


  getPackages(){
    for(var i = 0; i < this.currentSP.sp_package.length; i++){
      this.packageApiService.getById(this.currentSP.sp_package[i].id).subscribe(
        (data: SPPackage) => {
          this.packages.push(data);
        }
      )};
  }
  
}
