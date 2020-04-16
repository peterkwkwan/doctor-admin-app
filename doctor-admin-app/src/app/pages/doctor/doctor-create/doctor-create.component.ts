import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorApiService } from 'src/app/shared/api/doctor-api.service';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.scss']
})
export class DoctorCreateComponent implements OnInit {

  doctorForm: FormGroup;

  ngOnInit() {
      this.doctorForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      status: [''],
      email: [''],
      phone: [''],
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public doctorApiService: DoctorApiService
  ){ }
  submitForm() {
    this.doctorApiService.create(this.doctorForm.value).subscribe(res => {
      this.router.navigateByUrl('/doctor')
    });
  }
}
