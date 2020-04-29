import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SPApiService } from 'src/app/shared/api/sp-api.service';

@Component({
  selector: 'app-sp-update',
  templateUrl: './sp-update.component.html',
  styleUrls: ['./sp-update.component.scss']
})
export class SpUpdateComponent implements OnInit {

  currentSP: ServiceProvider = null;
  spForm = this.fb.group({
    name: [''],
    effective_date: [''],
    expiry_date: [''],
    sp_package: [{
      id: ['']
    }]
  })

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private spApiService: SPApiService) { }

  ngOnInit() {
    this.getSP(this.route.snapshot.paramMap.get('id'));
  }

  getSP(id) {
    this.spApiService.getById(id)
      .subscribe(
        data => {
          this.currentSP = data;
          this.initializeFb();
        },
        error => {
          console.log(error);
        });
  }

  initializeFb() {
    this.spForm.setValue({
      name: this.currentSP.name,
      effective_date: this.currentSP.effective_date,
      expiry_date: this.currentSP.expiry_date,
      sp_package: [{
        id: this.currentSP.sp_package[0].id
      }]
    })
  }

  submitForm() {
    this.spApiService.update(this.currentSP.id, this.spForm.value).subscribe(res => {
      this.router.navigateByUrl('/service-provider');
    });
  }

}
