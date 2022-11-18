import { Component, createComponent, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IniciarsesionComponent } from "./components/iniciarsesion/iniciarsesion.component";

import { NuevoaireComponent } from './components/nuevoaire/nuevoaire.component';
import { VeraireComponent } from './components/veraire/veraire.component';
import { DevicesComponent } from "./components/devices/devices.component";
import { HomeComponent } from "./components/home/home.component";
import { UserdataComponent } from "./components/userdata/userdata.component";
import { AnalyticsComponent } from "./components/analytics/analytics.component";
//import { CreateComponent } from './components/create/create.component';
//import { ContactComponent } from './components/contact/contact.component';
//import { ErrorComponent } from "./components/error/error.component";

const appRoutes: Routes=[
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'register', component: NuevoaireComponent},
    {path: 'iniciar-sesion', component: IniciarsesionComponent},
    {path: 'devices', component: DevicesComponent},
    {path: 'user', component: UserdataComponent},
    {path: 'new-device', component: VeraireComponent},
    {path: 'analytics', component: AnalyticsComponent}
    
    /*{path: 'proyectos', component: ProjectsComponent},
    {path: 'crear-proyecto', component: CreateComponent},
    {path: 'contacto', component: ContactComponent},
    {path: '**', component: ErrorComponent},*/
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);