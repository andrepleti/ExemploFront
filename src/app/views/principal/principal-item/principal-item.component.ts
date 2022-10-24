import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
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
      Nome: [null, [Validators.required]],
      Idade: [null, [Validators.required]]
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

}
