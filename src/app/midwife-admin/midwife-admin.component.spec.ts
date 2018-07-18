import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeAdminComponent } from './midwife-admin.component';

describe('MidwifeAdminComponent', () => {
  let component: MidwifeAdminComponent;
  let fixture: ComponentFixture<MidwifeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
