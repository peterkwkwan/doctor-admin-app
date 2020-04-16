import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorApiService } from 'src/app/shared/api/doctor-api.service';
import { Doctor } from 'src/app/shared/api/doctor-model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.scss']
})
export class DoctorUpdateComponent implements OnInit {

  currentDoctor: Doctor = null;
  doctorForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    status: [''],
    gender: [''],
    effective_date: [''],
    expiry_date: [''],
    email: [''],
    phone: [''],
    address: [''],
    clinics: [{
      id: ['']
    }]
  })

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private doctorApiService: DoctorApiService) { }

  ngOnInit() {
    this.getDoctor(this.route.snapshot.paramMap.get('id'));
  }

  getDoctor(id) {
    this.doctorApiService.getById(id)
      .subscribe(
        data => {
          this.currentDoctor = data;
          this.initializeFb();
        },
        error => {
          console.log(error);
        });
  }

  initializeFb() {
    this.doctorForm.setValue({
      firstName: this.currentDoctor.firstName,
      lastName: this.currentDoctor.lastName,
      status: this.currentDoctor.status,
      gender: this.currentDoctor.gender,
      effective_date: this.currentDoctor.effective_date,
      expiry_date: this.currentDoctor.expiry_date,
      email: this.currentDoctor.email,
      phone: this.currentDoctor.phone,
      address: this.currentDoctor.address,
      clinics: [{
        id: this.currentDoctor.clinics[0].id
      }]
    })
  }

  submitForm() {
    this.doctorApiService.update(this.currentDoctor.id, this.doctorForm.value).subscribe(res => {
      this.router.navigateByUrl('/doctor');
    });
  }
}
