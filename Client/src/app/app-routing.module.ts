import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'diagnostic', component: DiagnosticsComponent},
  {path: 'eval', component: EvaluationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
