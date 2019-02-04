
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dash1Component } from './dash-1.component';

describe('Dash1Component', () => {
  let component: Dash1Component;
  let fixture: ComponentFixture<Dash1Component>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Dash1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dash1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
