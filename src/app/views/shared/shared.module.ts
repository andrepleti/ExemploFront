import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { RouterModule } from '@angular/router';
import { ErroComponent } from './erro/erro.component';



@NgModule({
  declarations: [
    MenuPrincipalComponent,
    ErroComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuPrincipalComponent,
    ErroComponent
  ]
})
export class SharedModule { }
