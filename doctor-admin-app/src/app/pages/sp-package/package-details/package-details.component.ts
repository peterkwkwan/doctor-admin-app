import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPApiService } from 'src/app/shared/api/sp-api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SPPackage } from 'src/app/shared/api/sp-package-model';
import { SPPackageApiService } from 'src/app/shared/api/sp-package-api.service';
import { ClinicApiService } from 'src/app/shared/api/clinic-api.service';
import { Clinic } from 'src/app/shared/api/clinic-model';
import { Doctor} from 'src/app/shared/api/doctor-model';
import { DoctorApiService } from 'src/app/shared/api/doctor-api.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent implements OnInit {

  currentPackage: SPPackage = null;
  currentProvider: ServiceProvider = null;
  allClinics: Clinic[] = [];
  availableClinics: Clinic[] = [];
  availableDoctors: Doctor[] = [];
  clinicSearchForm = new FormControl();
  filteredClinic: Observable<Clinic[]>;

  constructor(private spApiService: SPApiService,
    private packageApiService: SPPackageApiService,
    private clinicApiService: ClinicApiService,
    private doctorApiService: DoctorApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPackage(this.route.snapshot.paramMap.get('id'));
    this.getAllClinics();
    this.filteredClinic = this.clinicSearchForm.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  getAllClinics(){
    this.clinicApiService.getAll().subscribe(
      data => {
        this.allClinics = data;
      }
    )
  }

  getPackage(id) {
    this.packageApiService.getById(id)
      .subscribe(
        data => {
          this.currentPackage = data;
          this.getServiceProvider();
          this.getClinic();
          this.getDoctor();
        },
        error => {
          console.log(error);
        });
  }

  getClinic() {
    for (var i = 0; i < this.currentPackage.clinics.length; i++) {
      let clinicId = this.currentPackage.clinics[i].id;
      this.clinicApiService.getById(clinicId).subscribe(
        data => {
          this.availableClinics.push(data);
        },
        err => {
          console.log(err);
        });
    }
  }
  
  getDoctor(){
    for (var i = 0; i < this.currentPackage.clinics.length; i++) {
      let clinicId = this.currentPackage.clinics[i].id;
      this.doctorApiService.getById(clinicId).subscribe(
        data => {
          this.availableDoctors.push(data);
        },
        err => {
          console.log(err);
        });
    }
  }

  getServiceProvider() {
    this.spApiService.getById(this.currentPackage.service_provider.id).subscribe(
      (data: ServiceProvider) => {
        this.currentProvider = data;
      }
    )
  };

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.allClinics.filter(
      selectedClinic => selectedClinic.name.toLowerCase().includes(filterValue) || 
      selectedClinic.id.toString().includes(filterValue))
  }

  onSubmit(){
    for(var i = 0; i < this.allClinics.length; i++){
      if(this.allClinics[i].name ===  this.clinicSearchForm.value){
        this.availableClinics.push(this.allClinics[i]);
        this.doctorApiService.getById(this.allClinics[i].doctor[0].id).subscribe(
          data => {
            this.availableDoctors.push(data);
          }
        );
      }
    }
  }
}

