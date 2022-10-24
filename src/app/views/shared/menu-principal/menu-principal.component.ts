import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styles: [
  ]
})
export class MenuPrincipalComponent implements OnInit {

@Input() Cor: string = "bg-primary";

constructor(private router: Router) {}

exibirMenu: boolean = true;
rotaSelecionada: string = "principal";

ngAfterViewChecked() {
  var url: string = this.router.routerState.snapshot.url || "";

  if (url.includes("secundario")) {
      this.rotaSelecionada = "secundario";
      console.log(this.rotaSelecionada)
      this.exibirMenu = true;
  } else {
    this.exibirMenu = true;
    this.rotaSelecionada = "principal";
  }
}

  ngOnInit(): void {
  }

}
