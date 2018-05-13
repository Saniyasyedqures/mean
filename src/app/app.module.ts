import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';



const appRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
