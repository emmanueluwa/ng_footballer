import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//somewhere to go once routes configured
import { FootballersComponent } from './footballers/footballers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FootballerDetailComponent } from './footballer-detail/footballer-detail.component';

const routes: Routes = [
  { path: 'footballers', component: FootballersComponent },
  { path: 'dashboard', component: DashboardComponent },
  //redirect url that fully matches empty path
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: FootballerDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
