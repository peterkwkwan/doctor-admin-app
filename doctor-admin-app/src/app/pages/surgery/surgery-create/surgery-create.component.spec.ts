import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryCreateComponent } from './surgery-create.component';

describe('SurgeryCreateComponent', () => {
  let component: SurgeryCreateComponent;
  let fixture: ComponentFixture<SurgeryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
