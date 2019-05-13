import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { ChartsModule } from 'ng2-charts';
import { NgxLineChartModule } from 'ngx-line-chart';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    NavBarComponent,
    DiagnosticsComponent,
    EvaluationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxChartsModule,
    ChartsModule,
    NgxLineChartModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3z3iWz2DjW7uSrZzohpZaaZQGq8vZ470'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
