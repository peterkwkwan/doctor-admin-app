import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpUpdateComponent } from './sp-update.component';

describe('SpUpdateComponent', () => {
  let component: SpUpdateComponent;
  let fixture: ComponentFixture<SpUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
