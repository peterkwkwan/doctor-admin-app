import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart } from '@angular/router';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPPackageApiService } from 'src/app/shared/api/sp-package-api.service';
import { SPPackage } from 'src/app/shared/api/sp-package-model';

@Component({
  selector: 'app-sp-package',
  templateUrl: './sp-package.component.html',
  styleUrls: ['./sp-package.component.scss']
})
export class SpPackageComponent implements OnInit {

  SPPackage: SPPackage[] = [];
  searchName = '';

  constructor(private packageApiService: SPPackageApiService, public route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.getSP();
      }
    });
    this.getSP();
  }

  getSP() {
    this.packageApiService.getAll().subscribe((data: SPPackage[]) => {
      this.SPPackage = data;
    });
  }

  filter() {
    const filtered = [];
    this.packageApiService.getAll().subscribe(
      (spPackage: SPPackage[]) => {
        spPackage.forEach(
          spPackage => {
            if (spPackage.name.toLowerCase().includes(this.searchName.toLowerCase()) ||
            spPackage.id.toString().includes(this.searchName)) {
              filtered.push(spPackage);
            }
          });
        this.SPPackage = filtered;
      });
  }

  clearSearch() {
    this.searchName = "";
    this.getSP();
  }

  delete(id) {
    this.packageApiService.delete(id)
      .subscribe(
        response => {
          this.getSP();
        },
        error => {
          console.log(error);
        });
  }

}
