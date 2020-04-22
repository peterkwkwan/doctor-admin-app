import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SPPackageApiService } from 'src/app/shared/api/sp-package-api.service';
import { SPPackage } from 'src/app/shared/api/sp-package-model';

@Component({
  selector: 'app-package-update',
  templateUrl: './package-update.component.html',
  styleUrls: ['./package-update.component.scss']
})
export class PackageUpdateComponent implements OnInit {

  currentPackage: SPPackage = null;
  packageForm = this.fb.group({
    name: ['']
  })

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private packageApiService: SPPackageApiService) { }

  ngOnInit() {
    this.getSP(this.route.snapshot.paramMap.get('id'));
  }

  getSP(id) {
    this.packageApiService.getById(id)
      .subscribe(
        data => {
          this.currentPackage = data;
          this.initializeFb();
        },
        error => {
          console.log(error);
        });
  }

  initializeFb() {
    this.packageForm.setValue({
      name: this.currentPackage.name
    })
  }

  submitForm() {
    this.packageApiService.update(this.currentPackage.id, this.packageForm.value).subscribe(res => {
      this.router.navigateByUrl('/sp-package');
    });
  }
}
