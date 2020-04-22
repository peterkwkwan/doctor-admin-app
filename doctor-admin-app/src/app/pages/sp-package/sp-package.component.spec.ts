import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPackageComponent } from './sp-package.component';

describe('SpPackageComponent', () => {
  let component: SpPackageComponent;
  let fixture: ComponentFixture<SpPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
