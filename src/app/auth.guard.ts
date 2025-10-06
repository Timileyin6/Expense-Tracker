import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Inject, inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  if(auth.isUserLoggedIn()){
    return true
  }else{
    router.navigate(['/logIn'])
    return false
  }
};
