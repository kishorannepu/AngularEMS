import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecpowercunComponent } from './secpowercun.component';

describe('SecpowercunComponent', () => {
  let component: SecpowercunComponent;
  let fixture: ComponentFixture<SecpowercunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecpowercunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecpowercunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
