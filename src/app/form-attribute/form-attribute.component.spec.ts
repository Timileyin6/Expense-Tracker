import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAttributeComponent } from './form-attribute.component';

describe('FormAttributeComponent', () => {
  let component: FormAttributeComponent;
  let fixture: ComponentFixture<FormAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAttributeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
