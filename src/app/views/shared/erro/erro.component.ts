import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidationsService } from './form-validations.service';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styles: [
  ]
})
export class ErroComponent implements OnInit {

  @Input() controle: FormControl = new FormControl;
  @Input() nomeCampo: string = "";
  @Input() coincidirTextoNome: string = "";

  constructor(private formValidationsService: FormValidationsService) { }

  ngOnInit(): void {
  }

  MensagemErro() {
    for (let nomePropriedade in this.controle.errors) {
      if (this.controle.errors.hasOwnProperty(nomePropriedade) &&
      this.controle.touched ) {
        return this.formValidationsService.RetornaMensagemErro(this.nomeCampo, nomePropriedade, this.controle.errors[nomePropriedade], this.coincidirTextoNome);
      }

    }
    return null;
  }

}
