import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecundarioListaComponent } from './secundario-lista/secundario-lista.component';
import { SecundarioItemComponent } from './secundario-item/secundario-item.component';

const routes: Routes = [
  { path: "", component: SecundarioListaComponent },
  { path: ":codigo", component: SecundarioItemComponent },
  { path: "**", redirectTo: "item" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecundarioRoutingModule { }
