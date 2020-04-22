import { Component, OnInit } from '@angular/core';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from 'src/app/shared/api/clinic-model';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPApiService } from 'src/app/shared/api/sp-api.service';
import { DoctorApiService } from 'src/app/shared/api/doctor-api.service';
import { Doctor } from 'src/app/shared/api/doctor-model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss']
})
export class ClinicDetailsComponent implements OnInit {

  currentClinic: Clinic = null;
  availableDoctors: Doctor[] = [];
  serviceProvider: ServiceProvider = null;
  doctorSearchForm = new FormControl();
  allDocs: Doctor[] =  [];
  filteredDoctors: Observable<Doctor[]>;

  constructor( private clinicApiService: ClinicApiService,
    private spApiService: SPApiService,
    private doctorApiService: DoctorApiService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getClinic(this.route.snapshot.paramMap.get('id'));
    this.getAllDoctors();
    this.filteredDoctors = this.doctorSearchForm.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  getAllDoctors(){
    this.doctorApiService.getAll().subscribe(
      data => {
        this.allDocs = data;
      }
    )
  }

  getClinic(id) {
    this.clinicApiService.getById(id)
      .subscribe(
        data => {
          this.currentClinic = data;
          this.getDoctors();
          this.getServiceProvider(this.currentClinic.service_providers[0].id);
        },
        error => {
          console.log(error);
        });
  }

  getDoctors() {
    for(var i = 0; i < this.currentClinic.doctor.length; i++){
      this.doctorApiService.getById(this.currentClinic.doctor[i].id).subscribe(
        data => {
          this.availableDoctors.push(data);
        }
      ) 
    }
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

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.allDocs.filter(
      selectedDoctor => selectedDoctor.firstName.toLowerCase().includes(filterValue) || 
      selectedDoctor.lastName.toLowerCase().includes(filterValue) ||
      selectedDoctor.id.toString().includes(filterValue))
  }

  remove(id){
    for(var i = 0; i < this.availableDoctors.length; i ++){
      if(this.availableDoctors[i].id === id){
        this.availableDoctors.splice(i, 1);
      }
    }
  }

  onSubmit(){
    for(var i = 0; i < this.allDocs.length; i++){
      if(this.allDocs[i].firstName + ' ' + this.allDocs[i].lastName ===  this.doctorSearchForm.value){
        this.availableDoctors.push(this.allDocs[i])
      }
    }
  }
}
