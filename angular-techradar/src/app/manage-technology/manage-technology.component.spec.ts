import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTechnologyComponent } from './manage-technology.component';

describe('ManageTechnologyComponent', () => {
  let component: ManageTechnologyComponent;
  let fixture: ComponentFixture<ManageTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTechnologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
