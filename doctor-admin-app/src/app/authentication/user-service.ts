import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  getUserInfo() {
    return this.http.get(
      "https://pa-portal-admin-dev.apps.sea.preview.pcf.manulife.com/api/v1/userinfo")
  }
}
