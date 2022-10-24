import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalItemComponent } from './principal-item/principal-item.component';
import { PrincipalListaComponent } from './principal-lista/principal-lista.component';

const routes: Routes = [
  { path: "", component: PrincipalListaComponent },
  { path: ":codigo", component: PrincipalItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
