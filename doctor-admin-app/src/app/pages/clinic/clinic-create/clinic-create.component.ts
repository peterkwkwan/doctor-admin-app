import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrls: ['./clinic-create.component.scss']
})
export class ClinicCreateComponent implements OnInit {

  clinicForm: FormGroup;

  ngOnInit() {
      this.clinicForm = this.fb.group({
      name: [''],
      description: [''],
      address: ['']
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public clinicApiService: ClinicApiService
  ){ }
  submitForm() {
    this.clinicApiService.create(this.clinicForm.value).subscribe(res => {
      this.router.navigateByUrl('/clinic')
    });
  }

}
