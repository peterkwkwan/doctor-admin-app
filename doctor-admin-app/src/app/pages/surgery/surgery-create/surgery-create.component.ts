import { Component, OnInit } from '@angular/core';

interface Surgery {
  name: String;
}

@Component({
  selector: 'app-surgery-create',
  templateUrl: './surgery-create.component.html',
  styleUrls: ['./surgery-create.component.scss']
})

export class SurgeryCreateComponent implements OnInit {

  surgeries: Surgery[] = [
    {name: 'Colonoscopy'},
    {name: 'OGD'},
    {name: 'OGD & Colonoscopy'},
    {name: 'Colonoscopy plus rubber band ligation'},
    {name: 'OGD & Colonoscopy plus rubber band ligation'},
  ];
  anaethesias: Surgery[] = [
    {name: 'MAC'},
    {name: 'LA'},
    {name: 'GA'}
  ]
  rooms: Surgery[] = [
    {name: 'Day Center/Clinic'},
    {name: 'Ward'},
    {name: 'Semi-Private'},
    {name: 'Private'}
  ]
  selectedSurgery: String = '';
  selectedAnaethesia: String = '';
  surgeryBoxes = [ {} ]

  constructor() { }

  ngOnInit(): void {
  }

  addSurgeryBox(){
    this.surgeryBoxes.push({});
  }
}
