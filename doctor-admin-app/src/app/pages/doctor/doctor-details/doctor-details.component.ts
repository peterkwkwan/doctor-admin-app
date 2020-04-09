import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/api/doctor-model';
import { DoctorApiService } from 'src/app/shared/api/doctor-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {
  currentDoctor: Doctor = null;

  constructor(
    private doctorApiService: DoctorApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getDoctor(this.route.snapshot.paramMap.get('id'));
  }

  getDoctor(id) {
    this.doctorApiService.getById(id)
      .subscribe(
        data => {
          this.currentDoctor = data;
        },
        error => {
          console.log(error);
        });
  }

  // updateDoctor(status) {
  //   const data = {
  //     username: this.currentDoctor.username,
  //     userContacts: this.currentDoctor.userContacts
  //   };

  //   this.doctorApiService.update(this.currentDoctor.id, data)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }


  deleteDoctor() {
    this.doctorApiService.delete(this.currentDoctor.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/doctor']);
        },
        error => {
          console.log(error);
        });
  }
}
