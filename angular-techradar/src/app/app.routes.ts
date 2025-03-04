import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {ManageTechnologyComponent} from './manage-technology/manage-technology.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'techradar', component: ManageTechnologyComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
