import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VincularFornecedorComponent } from './vincular-fornecedor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Removed redundant describe block
describe('VincularFornecedorComponent', () => {
  let component: VincularFornecedorComponent;
  let fixture: ComponentFixture<VincularFornecedorComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(VincularFornecedorComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.value).toEqual({
      cnpjEmpresa: '',
      cnpjCpfFornecedor: ''
    });
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.form.controls['cnpjEmpresa'].setValue('');
    component.form.controls['cnpjCpfFornecedor'].setValue('');
    expect(component.form.invalid).toBeTrue();
  });

  it('should mark the form as valid if required fields are filled', () => {
    component.form.controls['cnpjEmpresa'].setValue('12345678000195');
    component.form.controls['cnpjCpfFornecedor'].setValue('98765432100');
    expect(component.form.valid).toBeTrue();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
