import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationsService {

  constructor() {}

  static ValidacaoDataMaxima(controle: FormControl) {

    const data = controle.value;

    if (data && data != "") {
      return new Date(data) <= new Date() ? null: { DataInvalida: true };
    }
    return null;
  }

  static ValidacaoMesAno(controle: FormControl) {

    const valor = controle.value;

    const valoresSeparados = valor.split("/", 2);

    const mes = Number(valoresSeparados[0]);

    if (!valor.includes('/') || valor.length !== 7 || valoresSeparados[0].length !== 2 || valoresSeparados[1].length !== 4 || mes < 1 || mes > 12) {
      return { DataSelecionadaInvalida: true };
    }

    return null;
  }

  static ValidacaoSelecaoItem(controle: FormControl) {

    const valor = controle.value;

    return valor > 0 ? null: { ValorSelecionadoInvalido: true };
  }

  static ValidacaoSelecaoItemString(controle: FormControl) {

    const valor = controle.value;

    return valor !== "0" && valor !== "00" && valor !== "" && valor !== null ? null: { ValorSelecionadoInvalido: true };
  }

  static ValidacaoEmail(podeDeixarEmBranco: boolean = false): any {
    return (controle: FormControl): any => {

      const valor = controle.value;

      if (!valor && podeDeixarEmBranco) {
        return null;
      }

      var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

      return regex.test(valor) ? null: { EmailInvalido: true };
    };
  }

  static ValidacaoCPF(controle: FormControl) {
       if (controle.value) {
        var valor = controle.value.replace(".","").replace("-","");
         let numbers, digits, sum, i, result, equalDigits;
         equalDigits = 1;
         if (valor.length < 11) {
          return { CPFInvalido: true };
         }

         for (i = 0; i < valor.length - 1; i++) {
           if (valor.charAt(i) !== valor.charAt(i + 1)) {
             equalDigits = 0;
             break;
           }
         }

         if (!equalDigits) {
           numbers = valor.substring(0, 9);
           digits = valor.substring(9);
           sum = 0;
           for (i = 10; i > 1; i--) {
             sum += numbers.charAt(10 - i) * i;
           }

           result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

           if (result !== Number(digits.charAt(0))) {
             return { CPFInvalido: true };
           }
           numbers = valor.substring(0, 10);
           sum = 0;

           for (i = 11; i > 1; i--) {
             sum += numbers.charAt(11 - i) * i;
           }
           result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

           if (result !== Number(digits.charAt(1))) {
             return { CPFInvalido: true };
           }
           return null;
         } else {
           return { CPFInvalido: true };
         }
      }
    return null;
  }

  static ValidacaoCNPJ(controle: FormControl) {
       if (controle.value) {
        var valor = controle.value.replace(".","").replace("-","").replace("/","");

        if(valor == "") return { CNPJInvalido: true };

        if (valor.length != 14)
            return { CNPJInvalido: true };

        // Elimina CNPJs invalidos conhecidos
        if (valor == "00000000000000" ||
            valor == "11111111111111" ||
            valor == "22222222222222" ||
            valor == "33333333333333" ||
            valor == "44444444444444" ||
            valor == "55555555555555" ||
            valor == "66666666666666" ||
            valor == "77777777777777" ||
            valor == "88888888888888" ||
            valor == "99999999999999")
            return { CNPJInvalido: true };

        let tamanho, numeros, digitos, soma, pos, resultado;

        // Valida DVs
        tamanho = valor.length - 2
        numeros = valor.substring(0,tamanho);
        digitos = valor.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;

        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return { CNPJInvalido: true };

        tamanho = tamanho + 1;
        numeros = valor.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
              return { CNPJInvalido: true };

        return null;
       }

      return null;
  }

  static ValidacaoCPFECNPJ(controle: FormControl) {
    if (!FormValidationsService.ValidacaoCPF(controle) || !FormValidationsService.ValidacaoCNPJ(controle)) {
      return null;
    }

    return { CPFECNPJInvalido: true };
  }

  static ValidacaoCompararCampos(nomeCampoComparacao: string, podeDeixarEmBranco: boolean = false): any {
    return (controle: FormControl): any => {

      const valor = controle.value;

      if (!controle.root || !controle.parent) {
        return null;
      }

      const segundoValor = (controle.root as FormGroup).get(nomeCampoComparacao)?.value;

      if (!valor && !segundoValor && podeDeixarEmBranco) {
        return null;
      }

      return valor === segundoValor ? null: { CompararCamposInvalido: true };
    };
  }

  static ValidacaoValorMaiorZero(controle: FormControl) {

    const valor = controle.value;

    return valor > 0 ? null: { ValorMaiorZeroInvalido: true };
  }

  RetornaMensagemErro(nomeCampo: string, nomeValidacao: string, valorValidacao?: any, coincidirTextoNome?: string) {
    switch (nomeValidacao) {
        case "required": return `${nomeCampo} é obrigatório(a).`
        case "minlength": return `${nomeCampo} precisa ter no mínimo ${valorValidacao.requiredLength} caracteres.`
        case "maxlength": return `${nomeCampo} precisa ter no máximo ${valorValidacao.requiredLength} caracteres.`
        case "pattern": return  `${nomeCampo} inválido(a).`
        case "min": return  `${nomeCampo} mínimo(a) permitido(a): ${valorValidacao.min}.`
        case "max": return  `${nomeCampo} máximo(a) permitido(a): ${valorValidacao.max}.`
        case "DataInvalida": return  `${nomeCampo} não pode ultrapassar a data atual.`
        case "ValorSelecionadoInvalido": return  `${nomeCampo} é obrigatório(a).`
        case "DataSelecionadaInvalida": return  `${nomeCampo} é inválido(a).`
        case "EmailInvalido": return  `${nomeCampo} é inválido(a).`
        case "CPFInvalido": return  `${nomeCampo} é inválido(a).`
        case "CNPJInvalido": return  `${nomeCampo} é inválido(a).`
        case "CPFECNPJInvalido": return  `${nomeCampo} é inválido(a).`
        case "CompararCamposInvalido": return  `${coincidirTextoNome} não coincidem.`
        case "ValorMaiorZeroInvalido": return  `${nomeCampo} é inválido(a).`
        default: return "";
    }
  }

}
