import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/api/doctor-model';
import { Clinic } from 'src/app/shared/api/clinic-model';
import { DoctorApiService } from 'src/app/shared/api/doctor-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {
  currentDoctor: Doctor = null;
  clinic: Clinic = null;

  constructor(
    private doctorApiService: DoctorApiService,
    private clinicApiService: ClinicApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDoctor(this.route.snapshot.paramMap.get('id'));
  }

  getDoctor(id) {
    this.doctorApiService.getById(id)
      .subscribe(
        data => {
          this.currentDoctor = data;
          this.getClinic(this.currentDoctor.clinics[0].id);
        },
        error => {
          console.log(error);
        });
  }

  getClinic(id) {
    this.clinicApiService.getById(id)
      .subscribe(
        (data: Clinic) => {
          this.clinic = data;
        },
        error => {
          console.log(error);
        });
  }
}
