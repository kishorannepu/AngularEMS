
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainindexComponent } from './mainindex.component';

describe('MainindexComponent', () => {
  let component: MainindexComponent;
  let fixture: ComponentFixture<MainindexComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [MainindexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
