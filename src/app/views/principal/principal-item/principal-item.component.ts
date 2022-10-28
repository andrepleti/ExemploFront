import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { Pessoa } from 'src/app/models/Pessoa';
import { PrincipalService } from '../principal.service';

@Component({
  selector: 'app-principal-item',
  templateUrl: './principal-item.component.html',
  styles: [
  ]
})
export class PrincipalItemComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private service: PrincipalService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  form: FormGroup = this.formBuilder.group({});
  codigoCadastro: number = 0;
  texto: string = "";
  exibirSenhaTexto: boolean = false;

  ngOnInit(): void {
    this.InicializarForm();

    this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {

        if (queryParams["texto"]) {
          this.texto = queryParams["texto"];
        }

        this.CarregarObjeto();
      }
    );

    this.CarregarParametros();
  }

  InicializarForm() {
    this.form = this.formBuilder.group({
      Codigo: [0, []],
      Nome: [null, [Validators.required, Validators.maxLength(200)]],
      Login: [null, [Validators.required, Validators.maxLength(10)]],
      Senha: [null, [Validators.required, Validators.maxLength(10)]],
      Idade: [null, [Validators.required, Validators.min(18)]]
    });
  }

  CarregarObjeto() {
    this.activatedRoute.params
    .pipe(
      map(params => params["codigo"]),
      switchMap(codigo => this.service.GetObjeto(codigo))
      )
      .subscribe((x: Pessoa) => {
        this.form.patchValue(x);
      });
  }

  CarregarParametros() {
    this.router.navigate([], { queryParams: { "texto": this.texto } });
  }

  OnSubmit() {
    if (this.form.valid) {
      this.Submit();
    } else {
      this.ExibirValidacoes(this.form);
    }
  }

  Submit() {
    if (this.form.value.Codigo > 0) {
      this.service.Atualizar(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(["/principal"]);
      }
      );
    } else {
      this.service.Inserir(this.form.value)
        .pipe(first())
        .subscribe(() => {
              this.router.navigate(["/principal"]);
      }
      );
    }
  }

  ExibirValidacoes(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const controle = form.get(field);
      if (controle instanceof FormControl) {
        controle.markAsTouched({ onlySelf: true });
      } else if (controle instanceof FormGroup) {
        this.ExibirValidacoes(controle);
      }
    });
  }

  RetornaCampo(campo: string ) : FormControl {
    return this.form.get(campo) as FormControl;
  }

  AplicaCssErro(campo: string) {
     return { 'is-invalid': this.VerificaValidTouched(campo) }  
   }

   VerificaValidTouched(campo: string) {    
    return !this.RetornaCampo(campo).valid && this.RetornaCampo(campo).touched;  
  }

}
