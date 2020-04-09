import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { DoctorDetailsComponent } from './pages/doctor/doctor-details/doctor-details.component';
import { DoctorUpdateComponent } from './pages/doctor/doctor-update/doctor-update.component';
import { DoctorCreateComponent } from './pages/doctor/doctor-create/doctor-create.component';


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
    ]
  }
  // { path: '', redirectTo: 'signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
