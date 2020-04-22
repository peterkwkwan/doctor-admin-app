import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SPPackageApiService } from 'src/app/shared/api/sp-package-api.service';

@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.scss']
})
export class PackageCreateComponent implements OnInit {
   
  spForm: FormGroup;

  ngOnInit() {
      this.spForm = this.fb.group({
      name: ['']
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public spApiService: SPPackageApiService
  ){ }
  submitForm() {
    this.spApiService.create(this.spForm.value).subscribe(res => {
      this.router.navigateByUrl('/sp-package')
    });
  }
}
