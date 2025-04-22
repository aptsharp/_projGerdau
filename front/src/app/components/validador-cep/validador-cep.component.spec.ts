import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadorCepComponent } from './validador-cep.component';

describe('ValidadorCepComponent', () => {
  let component: ValidadorCepComponent;
  let fixture: ComponentFixture<ValidadorCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidadorCepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidadorCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
