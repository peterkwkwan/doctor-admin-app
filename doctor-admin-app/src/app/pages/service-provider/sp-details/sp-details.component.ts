import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';
import { SPApiService } from 'src/app/shared/api/sp-api.service';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from 'src/app/shared/api/clinic-model';

@Component({
  selector: 'app-sp-details',
  templateUrl: './sp-details.component.html',
  styleUrls: ['./sp-details.component.scss']
})
export class SpDetailsComponent implements OnInit {

  currentSP: ServiceProvider = null;
  clinics: Clinic[] = [];
  selected = 'None';

  constructor( private clinicApiService: ClinicApiService,
    private spApiService: SPApiService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.getSP(this.route.snapshot.paramMap.get('id'));
  }

  getSP(id) {
    this.spApiService.getById(id)
      .subscribe(
        (data: ServiceProvider) => {
          this.currentSP = data;
          for(var i = 0; i < this.currentSP.clinic.length; i++){
            this.getClinic(this.currentSP.clinic[i].id);
          }
        },
        error => {
          console.log(error);
        });
  }

  getClinic(id){
    this.clinicApiService.getById(id).subscribe(
      data => {
         this.clinics.push(data);
      },
      err => {
        console.log(err);
      });
  }
  
}
