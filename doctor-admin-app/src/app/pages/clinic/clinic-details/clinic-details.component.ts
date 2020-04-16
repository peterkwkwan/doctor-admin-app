import { Component, OnInit } from '@angular/core';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from 'src/app/shared/api/clinic-model';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPApiService } from 'src/app/shared/api/sp-api.service';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss']
})
export class ClinicDetailsComponent implements OnInit {

  currentClinic: Clinic = null;
  serviceProvider: ServiceProvider = null;

  constructor( private clinicApiService: ClinicApiService,
    private spApiService: SPApiService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getClinic(this.route.snapshot.paramMap.get('id'));
  }

  getClinic(id) {
    this.clinicApiService.getById(id)
      .subscribe(
        data => {
          this.currentClinic = data;
          this.getServiceProvider(this.currentClinic.service_providers[0].id);
        },
        error => {
          console.log(error);
        });
  }

  getServiceProvider(id) {
    this.spApiService.getById(id)
      .subscribe(
        data => {
          this.serviceProvider = data;
        },
        error => {
          console.log(error);
        });
  }
}
