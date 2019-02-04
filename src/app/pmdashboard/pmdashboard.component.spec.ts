
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmdashboardComponent } from './pmdashboard.component';

describe('PmdashboardComponent', () => {
  let component: PmdashboardComponent;
  let fixture: ComponentFixture<PmdashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PmdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
