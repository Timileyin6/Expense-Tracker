import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { TrackerComponent } from './tracker/tracker.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: 'signUp', component: SignUpComponent},
    {path: 'logIn', component: LoginComponent},
    {path: 'tracker', component: TrackerComponent, canActivate: [authGuard]},
    {path: '', redirectTo: '/tracker', pathMatch: 'full'}
];
