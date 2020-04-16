import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCreateComponent } from './sp-create.component';

describe('SpCreateComponent', () => {
  let component: SpCreateComponent;
  let fixture: ComponentFixture<SpCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
