import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidwifeContainerComponent } from './midwife-container.component';

describe('MidwifeContainerComponent', () => {
  let component: MidwifeContainerComponent;
  let fixture: ComponentFixture<MidwifeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidwifeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidwifeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
