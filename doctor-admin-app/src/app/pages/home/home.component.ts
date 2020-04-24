import { Component, OnInit } from '@angular/core';
import jsonData from "src/assets/categories.json";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/authentication/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  opened = false;
  categories = jsonData;
  user = null;
  firstname: string;

  constructor(private router: Router, public route: ActivatedRoute, private userService: UserService) {

    this.userService.getUserInfo().subscribe(
      (res: any) => {
        this.user = res;
        this.firstname = res.given_name.split("_", 1).toString();
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

  sidenavToggle(){
    this.opened = !this.opened;
  }

  logout(){
    this.router.navigate(['']);
  }

}
