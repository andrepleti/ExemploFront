import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuPrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuPrincipalComponent
  ]
})
export class SharedModule { }
