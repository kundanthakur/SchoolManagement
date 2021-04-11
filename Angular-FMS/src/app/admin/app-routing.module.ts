import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component'
import {EnrollmentComponent} from './enrollment/enrollment.component';
import {AccactionComponent} from './accaction/accaction.component';
import {AdminhomeComponent} from './adminhome/adminhome.component';
import {BillingComponent} from './billing/billing.component';
import {PaymentsComponent} from './payments/payments.component';
import {PayreminderComponent} from './payreminder/payreminder.component';
import {ReportComponent} from './report/report.component';
import {StudentinfoComponent} from './studentinfo/studentinfo.component';
import {FeeconfigurationComponent} from './feeconfiguration/feeconfiguration.component'
import {Student} from './Modal/auth.model';
const routes: Routes = [
  {
    path:"admin/login",
    component:LoginComponent
  },
  {
    path:"admin", component:DashboardComponent,
    children: [
      {path:"",component:AdminhomeComponent},
    {path:"Enrollment",component:EnrollmentComponent},
    {path:"Enrollment/:id",component:EnrollmentComponent},
    {path:"Billing",component:BillingComponent},
    {path:"Payments",component:PaymentsComponent},
    {path:"Sudent's",component:StudentinfoComponent},
    {path:"Report",component:ReportComponent},
    {path:"PaymentReminder",component:PayreminderComponent},
    {path:"AccountActions",component:AccactionComponent},
    {path:"Dashboard",component:AdminhomeComponent},
    {path:"FeesConfig",component:FeeconfigurationComponent}
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminModule { }
