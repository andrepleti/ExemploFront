import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "principal", loadChildren: () => import("./views/principal/principal.module").then(m => m.PrincipalModule) },
  { path: "secundario", loadChildren: () => import("./views/secundario/secundario.module").then(m => m.SecundarioModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
