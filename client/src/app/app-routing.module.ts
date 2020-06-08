import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StandsComponent } from './stands/stands.component';
import { StandDetailComponent } from './stand-detail/stand-detail.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'stands', component: StandsComponent},
  { path: 'stands/:id', component: StandDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }