import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecundarioRoutingModule } from './secundario-routing.module';
import { SecundarioListaComponent } from './secundario-lista/secundario-lista.component';
import { SecundarioItemComponent } from './secundario-item/secundario-item.component';

@NgModule({
  declarations: [
    SecundarioListaComponent,
    SecundarioItemComponent
  ],
  imports: [
    CommonModule,
    SecundarioRoutingModule
  ]
})
export class SecundarioModule { }
