import { Component, OnInit } from '@angular/core';
import { Clinic } from 'src/app/shared/api/clinic-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DoctorApiService } from 'src/app/shared/api/doctor-api.service';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';

@Component({
  selector: 'app-clinic-update',
  templateUrl: './clinic-update.component.html',
  styleUrls: ['./clinic-update.component.scss']
})
export class ClinicUpdateComponent implements OnInit {

  currentClinic: Clinic = null;
  clinicForm = this.fb.group({
    name: [''],
    description: [''],
    address: [''],
    service_providers: [{
      id: ['']
    }],
    doctor: [{
      id: ['']
    }]
  })

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private clinicApiService: ClinicApiService) { }

  ngOnInit() {
    this.getClinic(this.route.snapshot.paramMap.get('id'));
  }

  getClinic(id) {
    this.clinicApiService.getById(id)
      .subscribe(
        data => {
          this.currentClinic = data;
          this.initializeFb();
        },
        error => {
          console.log(error);
        });
  }

  initializeFb() {
    this.clinicForm.setValue({
      name: this.currentClinic.name,
      description: this.currentClinic.description,
      address: this.currentClinic.address,
      service_providers: [{
        id: this.currentClinic.service_providers[0].id
      }],
      doctor: [{
        id: this.currentClinic.doctor[0].id
      }]
    })
  }

  submitForm() {
    this.clinicApiService.update(this.currentClinic.id, this.clinicForm.value).subscribe(res => {
      this.router.navigateByUrl('/clinic');
    });
  }

}
