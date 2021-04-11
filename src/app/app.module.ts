import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarteComponent } from './carte/carte.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ForfaitMobileComponent } from './forfait-mobile/forfait-mobile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShapeService } from './shape.service';
import { HttpClientModule } from '@angular/common/http';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { BoxInternetComponent } from './box-internet/box-internet.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarteComponent,
    NewsletterComponent,
    ForfaitMobileComponent,
    ScrollTopComponent,
    BoxInternetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
