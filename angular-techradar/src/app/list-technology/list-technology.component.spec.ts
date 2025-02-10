import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechnologyComponent } from './list-technology.component';

describe('ListTechnologyComponent', () => {
  let component: ListTechnologyComponent;
  let fixture: ComponentFixture<ListTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTechnologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
