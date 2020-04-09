import { Component, OnInit } from '@angular/core';
import jsonData from "src/assets/categories.json";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  opened = false;
  categories = jsonData

  constructor(private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  sidenavToggle(){
    this.opened = !this.opened;
  }

  logout(){
    this.router.navigate(['/signin']);
  }

}
