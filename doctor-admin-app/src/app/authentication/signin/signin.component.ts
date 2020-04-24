import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onSignin() {
    // this.router.navigate(['/'])
    let client_id = 'randomString'; 
    document.location.href = 'https://manulife-dev.login.sys.sea.preview.pcf.manulife.com/oauth/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=https://pa-portal-admin-dev.apps.sea.preview.pcf.manulife.com/oauth2/login';
  }
}
