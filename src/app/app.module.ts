import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuevoaireComponent } from './components/nuevoaire/nuevoaire.component';
import { VeraireComponent } from './components/veraire/veraire.component';
import { UserService } from './services/user.service';
import { AireService } from './services/aire.service';
import { Correo } from './models/correo';
import { IniciarsesionComponent } from './components/iniciarsesion/iniciarsesion.component';
import { DevicesComponent } from './components/devices/devices.component';
import { UserdataComponent } from './components/userdata/userdata.component';
import { HomeComponent } from './components/home/home.component';
import { NgChartsModule } from 'ng2-charts';


// import { AuthComponent } from './shared/components/auth/auth.component';
// import { DatepickerI18n } from './shared/services/datepicker-i18n.service';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

import { NgCircleProgressModule } from 'ng-circle-progress';
import { AnalyticsComponent } from './components/analytics/analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    NuevoaireComponent,
    VeraireComponent,
    IniciarsesionComponent,
    DevicesComponent,
    UserdataComponent,
    HomeComponent,
    AnalyticsComponent
    
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    
    FormsModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    }),
    
    
  ],
  providers: [appRoutingProviders, UserService, AireService, PlotlyModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
