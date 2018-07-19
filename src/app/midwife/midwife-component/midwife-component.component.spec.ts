import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeComponentComponent } from './midwife-component.component';

describe('MidwifeComponentComponent', () => {
  let component: MidwifeComponentComponent;
  let fixture: ComponentFixture<MidwifeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
