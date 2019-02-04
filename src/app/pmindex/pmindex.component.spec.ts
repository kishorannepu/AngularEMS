
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PmindexComponent } from './pmindex.component';

describe('PmindexComponent', () => {
  let component: PmindexComponent;
  let fixture: ComponentFixture<PmindexComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [PmindexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
