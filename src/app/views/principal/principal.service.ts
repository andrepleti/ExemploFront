import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Pessoa } from 'src/app/models/Pessoa';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private httpService: HttpService<Pessoa>) { }

  GetLista(texto: string = "") {
    return this.httpService.GetList(`Pessoa/lista/${texto}`)
    .pipe(map(x => {
      return x;
    }));
  }

  GetObjeto(codigo: number) {
    return this.httpService.Get(`Pessoa/${codigo}`)
    .pipe(map(x => {
      return x;
    }));
  }
}
