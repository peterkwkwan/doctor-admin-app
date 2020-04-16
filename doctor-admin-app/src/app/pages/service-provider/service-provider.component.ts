import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart } from '@angular/router';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPApiService } from 'src/app/shared/api/sp-api.service';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  serviceProviders: ServiceProvider[] = [];
  searchName = '';

  constructor(private spApiService: SPApiService, public route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.getSP();
      }
    });
    this.getSP();
  }

  getSP() {
    this.spApiService.getAll().subscribe((data: ServiceProvider[]) => {
      this.serviceProviders = data;
    });
  }

  filter() {
    const filtered = [];
    this.spApiService.getAll().subscribe(
      (sp: ServiceProvider[]) => {
        sp.forEach(
          sp => {
            if (sp.name.toLowerCase().includes(this.searchName.toLowerCase()) ||
            sp.id.toString().includes(this.searchName)) {
              filtered.push(sp);
            }
          });
        this.serviceProviders = filtered;
      });
  }

  clearSearch() {
    this.searchName = "";
    this.getSP();
  }

  delete(id) {
    this.spApiService.delete(id)
      .subscribe(
        response => {
          this.getSP();
        },
        error => {
          console.log(error);
        });
  }

}
