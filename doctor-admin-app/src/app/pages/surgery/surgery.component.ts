import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from 'src/app/shared/api/sp-model';
import { SPApiService } from 'src/app/shared/api/sp-api.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.scss']
})
export class SurgeryComponent implements OnInit {

  currentSP: ServiceProvider = null;
  spSearchForm = new FormControl();
  allSPs: ServiceProvider[] = [];
  filteredSPs: Observable<ServiceProvider[]>;

  selectedType: String = '';
  types = [
    {
      name: 'Surgery',
      description: [
        { name: 'Colonoscopy', price: '2500', order: '1' },
        { name: 'OGD', price: '1500', order: '2' },
        { name: 'OGD & Colonoscopy', price: '500', order: '3' },
        { name: 'Colonoscopy plus rubber band ligation', price: '1000', order: '4' },
        { name: 'OGD & Colonoscopy plus rubber band ligation', price: '3000', order: '5' },
      ]
    },
    {
      name: 'Anaethesia',
      description: [
        { name: 'MAC', price: '500', order: '1' },
        { name: 'LA', price: '800', order: '2' },
        { name: 'GA', price: '900', order: '3' }
      ]
    },
    {
      name: 'Room',
      description: [
        { name: 'Day Center/Clinic', price: '1000', order: '1' },
        { name: 'Ward', price: '2500', order: '2' },
        { name: 'Semi-Private', price: '5000', order: '3' },
        { name: 'Private', price: '6500', order: '4' }
      ]
    }
  ]
  add = false;
  newSurgery = {
    name: '',
    name_chi: '',
    price: '',
    RMK: '',
    eff_date: '',
    exp_date: '',
    order: ''
  }

  constructor(private spApiService: SPApiService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllServiceProviders();
    this.filteredSPs = this.spSearchForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  getAllServiceProviders() {
    this.spApiService.getAll().subscribe(
      data => {
        this.allSPs = data;
      }
    )
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.allSPs.filter(
      selectedSP => selectedSP.name.toLowerCase().includes(filterValue) ||
        selectedSP.id.toString().includes(filterValue))
  }

  onSubmitServiceProvider() {
    for (var i = 0; i < this.allSPs.length; i++) {
      if (this.allSPs[i].name === this.spSearchForm.value) {
        this.currentSP = this.allSPs[i];
      }
    }
  }

  addSurgery() {
    this.add = true;
  }

  addSurgeryType(index) {
    this.add = false;
    this.types[index].description.push(this.newSurgery);
  }
}
