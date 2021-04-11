import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoxInternetComponent } from './box-internet/box-internet.component';
import { ForfaitMobileComponent } from './forfait-mobile/forfait-mobile.component';
import { CarteComponent } from './carte/carte.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'box-internet', component : BoxInternetComponent },
  { path : 'mobile', component : ForfaitMobileComponent },
  { path : 'carte', component : CarteComponent },
  { path : 'newsletter', component : NewsletterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
