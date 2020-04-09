import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/api/doctor-model';
import { DoctorApiService } from 'src/app/shared/api/doctor-api-service.service';
import { ActivatedRoute, Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  doctors: Doctor[] = [];
  searchName = '';
  url;

  constructor(private doctorApiService: DoctorApiService, public route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.getDoctor();
      }
    });
  }

  ngOnInit() {
    this.getDoctor();
  }

  getDoctor() {
    this.doctorApiService.getAll().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }

  filterDoctors() {
    const filtered = [];
    this.doctorApiService.getAll().subscribe(
      (doctor: Doctor[]) => {
        doctor.forEach(
          doctor => {
        if (doctor.username.toLowerCase().includes(this.searchName.toLowerCase()) || doctor.id.toString().includes(this.searchName)) { 
          filtered.push(doctor);
        }
      });
      this.doctors = filtered;
    });   
  }

  clearSearch() {
    this.searchName = "";
    this.getDoctor();
  }

  delete(id) {
    this.doctorApiService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.reloadComponent();
        },
        error => {
          console.log(error);
        });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/doctor']);
  }

}
