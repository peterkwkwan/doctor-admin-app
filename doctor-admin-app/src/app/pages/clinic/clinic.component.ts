import { Component, OnInit } from '@angular/core';
import { Clinic } from 'src/app/shared/api/clinic-model';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';
import { ActivatedRoute, Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  clinics: Clinic[] = [];
  searchName = '';

  constructor(private clinicApiService: ClinicApiService, public route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.getClinic();
      }
    });
    this.getClinic();
  }

  getClinic() {
    this.clinicApiService.getAll().subscribe((data: Clinic[]) => {
      this.clinics = data;
    });
  }

  filter() {
    const filtered = [];
    this.clinicApiService.getAll().subscribe(
      (clinic: Clinic[]) => {
        clinic.forEach(
          clinic => {
            if (clinic.name.toLowerCase().includes(this.searchName.toLowerCase()) ||
              clinic.id.toString().includes(this.searchName)) {
              filtered.push(clinic);
            }
          });
        this.clinics = filtered;
      });
  }

  clearSearch() {
    this.searchName = "";
    this.getClinic();
  }

  delete(id) {
    this.clinicApiService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.getClinic();
        },
        error => {
          console.log(error);
        });
  }
}
