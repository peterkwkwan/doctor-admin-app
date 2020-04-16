import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SPApiService } from 'src/app/shared/api/sp-api.service';

@Component({
  selector: 'app-sp-create',
  templateUrl: './sp-create.component.html',
  styleUrls: ['./sp-create.component.scss']
})
export class SpCreateComponent implements OnInit {

  spForm: FormGroup;

  ngOnInit() {
      this.spForm = this.fb.group({
      name: [''],
      effective_date: [''],
      expiry_date: [''],

    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public spApiService: SPApiService
  ){ }
  submitForm() {
    this.spApiService.create(this.spForm.value).subscribe(res => {
      this.router.navigateByUrl('/service-provider')
    });
  }

}
