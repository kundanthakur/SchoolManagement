import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppAdminModule} from './admin/app-routing.module';
const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,AppAdminModule]
})
export class AppRoutingModule { }
