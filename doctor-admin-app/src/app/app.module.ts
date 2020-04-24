// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// guard
import { UserValidatorService } from './authentication/user-validator-guard';

// material angular
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

// pages
import { FooterComponent } from './shared/footer/footer.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { DoctorDetailsComponent } from './pages/doctor/doctor-details/doctor-details.component';
import { DoctorUpdateComponent } from './pages/doctor/doctor-update/doctor-update.component';
import { DoctorCreateComponent } from './pages/doctor/doctor-create/doctor-create.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';
import { SpCreateComponent } from './pages/service-provider/sp-create/sp-create.component';
import { SpDetailsComponent } from './pages/service-provider/sp-details/sp-details.component';
import { SpUpdateComponent } from './pages/service-provider/sp-update/sp-update.component';
import { ClinicComponent } from './pages/clinic/clinic.component';
import { ClinicCreateComponent } from './pages/clinic/clinic-create/clinic-create.component';
import { ClinicDetailsComponent } from './pages/clinic/clinic-details/clinic-details.component';
import { ClinicUpdateComponent } from './pages/clinic/clinic-update/clinic-update.component';
import { SpPackageComponent } from './pages/sp-package/sp-package.component';
import { PackageCreateComponent } from './pages/sp-package/package-create/package-create.component';
import { PackageDetailsComponent } from './pages/sp-package/package-details/package-details.component';
import { PackageUpdateComponent } from './pages/sp-package/package-update/package-update.component';
import { SurgeryComponent } from './pages/surgery/surgery.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    FooterComponent,
    DoctorComponent,
    DoctorDetailsComponent,
    DoctorUpdateComponent,
    DoctorCreateComponent,
    ServiceProviderComponent,
    SpCreateComponent,
    SpDetailsComponent,
    SpUpdateComponent,
    ClinicComponent,
    ClinicCreateComponent,
    ClinicDetailsComponent,
    ClinicUpdateComponent,
    SpPackageComponent,
    PackageCreateComponent,
    PackageDetailsComponent,
    PackageUpdateComponent,
    SurgeryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    UserValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
