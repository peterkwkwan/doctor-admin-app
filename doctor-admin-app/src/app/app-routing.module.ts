import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'doctor', component: DoctorComponent, children: [
          { path: 'create', component:  DoctorCreateComponent },
          { path: ':id', component: DoctorDetailsComponent },
          { path: 'update/:id', component: DoctorUpdateComponent }
        ]
      },
      {
        path: 'clinic', component: ClinicComponent, children: [
          { path: 'create', component:  ClinicCreateComponent },
          { path: ':id', component: ClinicDetailsComponent },
          { path: 'update/:id', component: ClinicUpdateComponent }
        ]
      },
      {
        path: 'service-provider', component: ServiceProviderComponent, children: [
          { path: 'create', component:  SpCreateComponent },
          { path: ':id', component: SpDetailsComponent },
          { path: 'update/:id', component: SpUpdateComponent }
        ]
      },
    ]
  }
  // { path: '', redirectTo: 'signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
