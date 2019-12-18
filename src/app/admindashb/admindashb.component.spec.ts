import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashbComponent } from './admindashb.component';

describe('AdmindashbComponent', () => {
  let component: AdmindashbComponent;
  let fixture: ComponentFixture<AdmindashbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindashbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
