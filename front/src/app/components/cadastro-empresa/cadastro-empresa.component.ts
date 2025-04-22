import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { ValidadorCepComponent } from '../validador-cep/validador-cep.component';

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidadorCepComponent],
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.scss'
})
export class CadastroEmpresaComponent {

  cepValido: boolean = false; // não livera o cadastro cep invalido

  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) {
    this.form = this.formBuilder.group({
      cnpj: ['', [Validators.required]],
      nomeFantasia: ['', [Validators.required]],
      cep: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.form.get('cep')?.valueChanges.subscribe(() => {
      this.cepValido = false;
    });
  }


  onSubmit() {
    if (this.form.valid) {
      this.empresaService.criar(this.form.value).subscribe({
        next: () => {
          alert('✅ Empresa cadastrada com sucesso!');
          this.form.reset();
        },
        error: (err: any) => {
          console.error('❌ Erro ao cadastrar empresa:', err);
          alert('Erro ao cadastrar empresa.');
        }
      });
    }
  }

  onCepValido(cepInfo: any) {
    console.log('CEP válido recebido:', cepInfo);
    this.cepValido = true;
  }

  onLimpar() {
    this.form.reset();
  }


}
