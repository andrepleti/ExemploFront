import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Pessoa } from 'src/app/models/Pessoa';
import { PrincipalService } from '../principal.service';

@Component({
  selector: 'app-principal-lista',
  templateUrl: './principal-lista.component.html',
  styles: [
  ]
})
export class PrincipalListaComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  constructor(private service: PrincipalService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  lista: Pessoa[] = [];

  ngOnInit(): void {
    this.InicializarForm();

    this.activatedRoute.queryParams.subscribe(
      (queryParams: any) => {

        if (queryParams["texto"]) {
            this.form.patchValue({
              Texto: queryParams["texto"]
            });
        } else {
            this.form.patchValue({
              Texto: ""
            });
        }

        this.CarregarLista();
      }
    );

    this.Submit();
  }

  InicializarForm() {
    this.form = this.formBuilder.group({
      Texto: ["", []]
    });
  }

  CarregarLista() {
    this.service.GetLista(this.form.value.Texto)
    .pipe(first())
    .subscribe(x => {
      this.lista = x;
    });
  }

  Submit() {
    this.router.navigate([], { queryParams: { "texto": this.form.value.Texto }});
  }

}
