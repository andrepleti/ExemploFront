import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalListaComponent } from './principal-lista/principal-lista.component';
import { PrincipalItemComponent } from './principal-item/principal-item.component';
import { PrincipalService } from './principal.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PrincipalListaComponent,
    PrincipalItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrincipalRoutingModule
  ],
  providers: [PrincipalService]
})
export class PrincipalModule { }
